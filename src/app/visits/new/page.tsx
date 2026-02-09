'use client'

import { useState, useRef, useEffect, useTransition } from 'react'
import { Camera, Upload, X, Loader2, Calendar as CalendarIcon, User, Tag } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { createVisit } from './actions'
import { useActionState } from 'react' // Next.js 15/React 19 hook
import { useRouter } from 'next/navigation'

import imageCompression from 'browser-image-compression'

// Mock customers for now - in real app fetch from DB
// We will implement a search/create customer later
type Customer = { id: string; name: string }

export default function NewVisitPage() {
    const [file, setFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const [customers, setCustomers] = useState<Customer[]>([])
    const [loadingCustomers, setLoadingCustomers] = useState(true)

    // Use useActionState for form handling (Server Actions)
    const [state, formAction, isPending] = useActionState(createVisit, null)
    const [isPendingTransition, startTransition] = useTransition()

    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        async function fetchCustomers() {
            const { data } = await supabase.from('customers').select('id, display_name')
            if (data) {
                setCustomers(data.map(c => ({ id: c.id, name: c.display_name || '名称未設定' })))
            }
            setLoadingCustomers(false)
        }
        fetchCustomers()
    }, [])

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0]
            setFile(selectedFile)
            setPreviewUrl(URL.createObjectURL(selectedFile))
        }
    }

    const handleFormSubmit = async (formData: FormData) => {
        // This function is unused in manualSubmit mode but kept for reference
    }

    // Refined approach: Single submit handler that does it all.
    const [isSubmitting, setIsSubmitting] = useState(false)

    const manualSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.currentTarget)

        // Upload logic
        if (file) {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return // Should redirect

            let uploadFile = file;
            let fileExt = file.name.split('.').pop();

            // Compress image to save storage
            try {
                if (file.type.startsWith('image/')) {
                    const options = {
                        maxSizeMB: 0.6, // Target < 600KB
                        maxWidthOrHeight: 1400, // Resize to reasonable width
                        useWebWorker: true,
                        fileType: 'image/jpeg' // Convert to JPEG
                    }
                    const compressedFile = await imageCompression(file, options);
                    uploadFile = compressedFile;
                    fileExt = 'jpg';
                    console.log(`Compressed: ${(file.size / 1024 / 1024).toFixed(2)}MB -> ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`);
                }
            } catch (error) {
                console.error('Compression skipped', error);
            }

            // Security: Use UUID to prevent guessing other users' photos
            const fileName = `${crypto.randomUUID()}.${fileExt}`
            // Path: {userId}/{uuid}.ext
            const filePath = `${user.id}/${fileName}`

            const { error } = await supabase.storage
                .from('visit-photos')
                .upload(filePath, uploadFile)

            if (error) {
                console.error(error)
                alert('Upload Failed')
                setIsSubmitting(false)
                return
            }
            formData.set('photoPath', filePath)
        }

        // Call server action directly
        const result = await createVisit(null, formData)
        if (result?.error) {
            alert(result.error)
            setIsSubmitting(false)
        }
        // Redirect is handled in server action
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border p-4 flex items-center gap-4">
                <button onClick={() => router.back()} className="p-2 hover:bg-muted rounded-full">
                    <X className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-bold">新規来店記録</h1>
            </header>

            <main className="container mx-auto px-4 py-6 max-w-lg">
                <form onSubmit={manualSubmit} className="space-y-8">

                    {/* Photo Upload Section */}
                    <div className="relative group">
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className={`aspect-[4/3] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${previewUrl ? 'border-transparent bg-black' : 'border-border bg-muted/30 hover:bg-muted/50'
                                }`}
                        >
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                            ) : (
                                <div className="text-center p-6 space-y-2">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                        <Camera className="w-8 h-8 text-primary" />
                                    </div>
                                    <p className="font-bold text-foreground">写真を撮影 / 選択</p>
                                    <p className="text-xs text-muted-foreground">施術後のスタイル写真を記録</p>
                                </div>
                            )}

                            {previewUrl && (
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="flex items-center gap-2 text-white font-medium">
                                        <Camera className="w-5 h-5" />
                                        撮り直す
                                    </div>
                                </div>
                            )}
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6">

                        <div className="space-y-2">
                            <label className="text-sm font-bold flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4 text-primary" />
                                来店日
                            </label>
                            <input
                                type="date"
                                name="visitDate"
                                defaultValue={new Date().toISOString().split('T')[0]}
                                className="w-full bg-card border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold flex items-center gap-2">
                                    <User className="w-4 h-4 text-primary" />
                                    顧客
                                </label>
                                <button
                                    type="button"
                                    onClick={() => router.push('/customers/new')}
                                    className="text-xs text-primary font-medium hover:underline"
                                >
                                    + 新規登録
                                </button>
                            </div>

                            {loadingCustomers ? (
                                <div className="h-12 w-full bg-muted animate-pulse rounded-xl" />
                            ) : (
                                <select
                                    name="customerId"
                                    className="w-full bg-card border border-input rounded-xl px-4 py-3 appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    defaultValue=""
                                    required
                                >
                                    <option value="" disabled>顧客を選択してください</option>
                                    {customers.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                    {customers.length === 0 && <option value="" disabled>顧客がいません</option>}
                                </select>
                            )}
                            {/* Fallback for now if no customers exist */}
                            {customers.length === 0 && !loadingCustomers && (
                                <p className="text-xs text-destructive">
                                    ※ 先に顧客登録が必要です（簡易実装のため、DBに手動追加してください）
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold flex items-center gap-2">
                                <Tag className="w-4 h-4 text-primary" />
                                メニュータグ
                            </label>
                            <input
                                type="text"
                                name="tags"
                                placeholder="カット, カラー, トリートメント..."
                                className="w-full bg-card border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            />
                            <p className="text-xs text-muted-foreground ml-1">カンマ区切りで入力</p>
                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                保存中...
                            </>
                        ) : (
                            '保存する'
                        )}
                    </button>
                </form>
            </main>
        </div>
    )
}
