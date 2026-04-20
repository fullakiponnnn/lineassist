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
                // @ts-ignore
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
            <div className="bg-[#ffffff] rounded-[2rem] p-8 shadow-[0_12px_40px_rgba(27,28,26,0.04)] group relative">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-serif font-bold text-xl text-[#1b1c1a] tracking-wide flex items-center gap-2">
                        <span className="text-[#6a5e33]">◆</span> 備考メモ
                    </h3>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="p-2.5 text-[#717974] hover:bg-[#f5f3ef] hover:text-[#414944] rounded-full transition-colors"
                            disabled={isSaving}
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleSave}
                            className="p-2.5 bg-gradient-to-br from-[#134231] to-[#2d5a47] text-white rounded-full hover:opacity-90 transition-all shadow-[0_8px_16px_rgba(27,28,26,0.06)]"
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
                    className="w-full min-h-[160px] p-5 rounded-[1rem] bg-[#f5f3ef] text-[#1b1c1a] focus:bg-[#ffffff] focus:shadow-[0_8px_24px_rgba(27,28,26,0.06)] outline-none border-none resize-none transition-all duration-300 placeholder:text-[#a1a1a0]"
                    autoFocus
                />
            </div>
        )
    }

    return (
        <div className="bg-[#ffffff] rounded-[2rem] p-8 shadow-[0_12px_40px_rgba(27,28,26,0.04)] group relative">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-bold text-xl text-[#1b1c1a] tracking-wide flex items-center gap-2">
                    <span className="text-[#6a5e33]">◆</span> 備考メモ
                </h3>
                <button
                    onClick={() => setIsEditing(true)}
                    className="p-2.5 text-[#134231] bg-[#f5f3ef] opacity-0 group-hover:opacity-100 hover:bg-[#e4e2de] rounded-full transition-all duration-300"
                >
                    <Pencil className="w-4 h-4" />
                </button>
            </div>
            {notes ? (
                <p className="text-base text-[#414944] whitespace-pre-wrap leading-relaxed px-2">
                    {notes}
                </p>
            ) : (
                <p 
                    className="text-sm text-[#a1a1a0] italic py-8 text-center rounded-[1rem] bg-[#f5f3ef]/50 cursor-pointer hover:bg-[#f5f3ef] transition-colors" 
                    onClick={() => setIsEditing(true)}
                >
                    備考はまだありません。<br />タップして入力...
                </p>
            )}
        </div>
    )
}
