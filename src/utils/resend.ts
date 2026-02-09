import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendSetupEmail = async (to: string, userName: string, userId: string) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'SnapKarte Support <support@snapkarte.jp>',
            to: [to],
            subject: '【重要】初期設定サポートのご案内（SnapKarte）',
            html: `
        <div style="font-family: sans-serif; color: #333; line-height: 1.6;">
          <h2>ご購入ありがとうございます</h2>
          <p>${userName} 様</p>
          <p>
            この度は、SnapKarteの初期導入サポートにお申し込みいただき、誠にありがとうございます。<br>
            決済の完了を確認いたしました。
          </p>
          
          <div style="background-color: #fce7f3; border: 1px solid #fbcfe8; padding: 16px; border-radius: 8px; margin: 24px 0;">
            <h3 style="margin-top: 0; color: #be185d;">⚠️ 重要：次のステップへお進みください</h3>
            <p>
              サポート担当者が設定を開始するために、お客様とのLINE連携が必要です。<br>
              以下の手順でご連絡をお願いいたします。
            </p>
            <ol>
              <li>以下の店舗IDをコピーしてください。<br>
                <code style="display: inline-block; background: #fff; padding: 4px 8px; border-radius: 4px; font-weight: bold; margin: 4px 0;">${userId}</code>
              </li>
              <li>以下のボタンから公式LINEを友だち追加してください。</li>
              <li>コピーした店舗IDをLINEメッセージで送信してください。</li>
            </ol>
            <div style="text-align: center; margin-top: 24px;">
              <a href="https://lin.ee/O3ydcSf" style="background-color: #06C755; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">公式LINEを友だち追加する</a>
            </div>
          </div>

          <p>
            上記の手順が完了次第、担当者が設定作業を開始いたします。<br>
            ご不明な点がございましたら、このメールへの返信にてお問い合わせください。
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">
          <p style="font-size: 12px; color: #888;">
            SnapKarte 運営事務局<br>
            <a href="https://www.snapkarte.jp">https://www.snapkarte.jp</a>
          </p>
        </div>
      `,
        });

        if (error) {
            console.error('Email sending failed:', error);
            return { success: false, error };
        }

        console.log('Email sent successfully:', data);
        return { success: true, data };
    } catch (err) {
        console.error('Unexpected error sending email:', err);
        return { success: false, error: err };
    }
};
