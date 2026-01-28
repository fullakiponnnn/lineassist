import { messagingApi } from '@line/bot-sdk'

export class LineService {
    private client: messagingApi.MessagingApiClient

    constructor(channelAccessToken: string) {
        this.client = new messagingApi.MessagingApiClient({
            channelAccessToken: channelAccessToken,
        })
    }

    async pushMessage(
        to: string,
        messages: messagingApi.Message[]
    ): Promise<void> {
        try {
            await this.client.pushMessage({
                to,
                messages,
            })
        } catch (error) {
            console.error('LINE Push Message Error:', error)
            throw error
        }
    }

    async replyMessage(
        replyToken: string,
        messages: messagingApi.Message[]
    ): Promise<void> {
        try {
            await this.client.replyMessage({
                replyToken,
                messages,
            })
        } catch (error) {
            console.error('LINE Reply Message Error:', error)
            throw error
        }
    }

    async sendVisitThankYou(
        userId: string,
        imageUrl: string,
        shopName: string
    ) {
        // Construct a Flex Message or just Image + Text
        // Simple version: Image then Text
        const messages: messagingApi.Message[] = [
            {
                type: 'image',
                originalContentUrl: imageUrl,
                previewImageUrl: imageUrl // In a real app, generate a smaller preview
            },
            {
                type: 'text',
                text: `${shopName}へのご来店ありがとうございました！\n本日のスタイル写真をお送りします。\nまたのご来店を心よりお待ちしております。`
            }
        ]

        await this.pushMessage(userId, messages)
    }

    async sendReminder(
        userId: string,
        customerName: string,
        shopName: string,
        lastVisitDate: string
    ) {
        const messages: messagingApi.Message[] = [
            {
                type: 'text',
                text: `${customerName}様、こんにちは！\n${shopName}です。\n\n前回の${lastVisitDate}のご来店からお時間が経ちましたが、髪の調子はいかがでしょうか？\n\nメンテナンスをご希望でしたら、お気軽にご連絡ください！お待ちしております。`
            }
        ]

        await this.pushMessage(userId, messages)
    }
}
