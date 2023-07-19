import { MDivider } from "../../baseUI/mDivider";
import MText from "../../baseUI/mText";
import MVStack from "../../baseUI/mVStack";
import { eColor } from '../../../lib/globalStyles';


export function SupportModalItem() {
  return (
    <MVStack stretchH stretchW style={{ 'alignItems': 'center' }}>
      <MText style={{ fontWeight: '700', marginBottom: 10 }} >Support</MText>
      {/* <MText style={{ color: eColor.GrayContentText }} >Version 1.1</MText> */}
      {/* <MText style={{ color: eColor.GrayContentText }}>Effective as of Jun 30, 2022</MText> */}
      <MDivider style={{ marginVertical: 0 }} />
      <MText numberOfLines={null}>
        {`
Contact Us - Answering Your Questions

Dear users,

We sincerely thank you for your continuous support and trust in us. Whether you are interested in our products, have any questions, or need technical support, we encourage you to contact us as soon as possible. In order to provide you with timely assistance and answers, we provide the following contact information:

Twitter: https://twitter.com/sodiums_org

Twitter is a real-time interactive platform where our official account, @Sodiums_org, regularly posts the latest news, product updates, and frequently asked questions. You can send us messages or ask questions through @Sodiums_org, and our team will reply to your inquiries as soon as possible.

Contact Email: support@sodium.org

If you have any questions, suggestions, or collaboration intentions regarding our products, please feel free to email us at support@sodium.org. Our customer service team will reply to you in the shortest time possible and provide you with satisfactory solutions.

We deeply understand the importance of customer satisfaction, so we will do our best to ensure high-quality customer support and timely response. We promise that every question and feedback from you will be taken seriously.

Whether you are a new user or a long-term user, we value your opinions and suggestions because they are crucial for us to improve and enhance product quality continuously.

Please rest assured that we always put users at the center and are committed to providing you with excellent products and high-quality service experiences.

Once again, thank you for choosing our products. If you have any questions, please feel free to contact us. We look forward to working with you to solve any issues and ensure the best help and support for you during the usage.

Sincerely wishing you all the best!

The Sodium Team
          `
        }
      </MText>
    </MVStack>
  )
}