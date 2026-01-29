'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Pencil, Check, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function CustomerNotes({ customerId, initialNotes }: { customerId: string, initialNotes: string }) {
    const [isEditing, setIsEditing] = useState(false)
    const [notes, setNotes] = useState(initialNotes || '')
    const [isSaving, setIsSaving] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleSave = async () => {
        setIsSaving(true)
        try {
            const { error } = await supabase
                .from('customers')
                .update({ notes: notes })
                .eq('id', customerId)

            if (error) throw error

            setIsEditing(false)
            router.refresh()
        } catch (error) {
            console.error('Error updating notes:', error)
            alert('備考の保存に失敗しました')
        } finally {
            setIsSaving(false)
        }
    }

    if (isEditing) {
        return (
            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm mt-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">備考メモ</h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"
                            disabled={isSaving}
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleSave}
                            className="p-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-all shadow-md"
                            disabled={isSaving}
                        >
                            <Check className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="お客様に関するメモを入力（例: 趣味、好み、会話の内容など）"
                    className="w-full min-h-[120px] p-3 rounded-lg bg-muted/50 border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    autoFocus
                />
            </div>
        )
    }

    return (
        <div className="bg-card rounded-2xl p-6 border border-border shadow-sm mt-6 group relative">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg">備考メモ</h3>
                <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
                >
                    <Pencil className="w-4 h-4" />
                </button>
            </div>
            {notes ? (
                <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                    {notes}
                </p>
            ) : (
                <p className="text-sm text-muted-foreground italic py-4 text-center border-2 border-dashed border-muted rounded-lg cursor-pointer hover:border-primary/30 transition-colors" onClick={() => setIsEditing(true)}>
                    備考はまだありません。<br />タップして入力...
                </p>
            )}
        </div>
    )
}
