import { MDivider } from "../../baseUI/mDivider";
import MText from "../../baseUI/mText";
import MVStack from "../../baseUI/mVStack";


export function PrivacyPolicyModalItem() {
  return (
    <MVStack stretchH stretchW style={{ 'alignItems': 'center' }}>
      <MText style={{ fontWeight: '700', marginBottom: 10 }} >Privacy Policy</MText>
      {/* <MText style={{ color: eColor.GrayContentText }} >Version 1.1</MText> */}
      {/* <MText style={{ color: eColor.GrayContentText }}>Effective as of Jun 30, 2022</MText> */}
      <MDivider style={{ marginVertical: 0 }} />
      <MText numberOfLines={null}>
        {`
Introduction
At Sodium Wallet (referenced as "we," "us," or "our"), accessible from https://sodiums.org, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that are collected and recorded by Sodium Wallet and how we use it.
Please contact us if you have additional questions or require more information about our Privacy Policy.

Log Data
Like many site operators, we collect information your browser sends whenever you visit our Site ("Log Data").
This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages, and other statistics.

Cookies
Cookies are files with a small amount of data. These are sent to your browser from the website you visit and stored on your computer's hard drive.
Our website uses these "cookies" to collect information and to improve our Service. You can either accept or refuse these cookies and know when a cookie is being sent to your computer. If you choose to refuse our cookies, you may not be able to use some portions of our Service.

Service Providers
We may employ third-party companies and individuals due to the following reasons:
• To facilitate our Service;
• To provide the Service on our behalf;
• To perform Service-related services; or
• To assist us in analyzing how our Service is used.
We want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.

Security
We value your trust in providing us with your Personal Information. Thus, we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.

Links to Other Sites
Our Service may contain links to other sites. You will be directed to that site if you click on a third-party link. Note that we do not operate these external sites. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for any third-party sites or services' content, privacy policies, or practices.

Changes to This Privacy Policy
We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.

Contact Us
If you have any questions or suggestions about our Privacy Policy, please contact us at privacy@sodiums.org.

        `}
      </MText>
    </MVStack>
  )
}