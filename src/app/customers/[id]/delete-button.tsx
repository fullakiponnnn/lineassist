'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Loader2 } from 'lucide-react'
import { deleteCustomer } from './actions'

export default function DeleteCustomerButton({ customerId }: { customerId: string }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleDelete = async () => {
        if (!confirm('本当にこの顧客データを削除しますか？\n来店履歴や写真もすべて削除されます。この操作は取り消せません。')) {
            return
        }

        startTransition(async () => {
            const result = await deleteCustomer(customerId)
            if (result?.error) {
                alert(result.error)
            } else {
                // Success, redirect happens or handled here
                router.push('/customers')
                router.refresh()
            }
        })
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
            title="顧客を削除"
        >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
        </button>
    )
}
