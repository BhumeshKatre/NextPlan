import Breadcrumb from '../components/Breadcrumb'

export const metadata = {
  title: 'Privacy Policy | NextPlan',
  description: 'Read our Privacy Policy to understand how NextPlan collects, uses, and protects your personal information.',
}

export default function PrivacyPolicy() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Privacy Policy' },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Breadcrumb items={breadcrumbItems} />
      
      <article className="prose prose-slate max-w-none">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
        <p className="text-slate-600 mb-8">
          <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Welcome to NextPlan ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
          <h3 className="text-xl font-semibold text-slate-800 mb-3">2.1 Personal Information</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
            <li>Register for our newsletter</li>
            <li>Contact us through our contact form</li>
            <li>Create an account on our platform</li>
            <li>Subscribe to job alerts</li>
          </ul>
          <p className="text-slate-700 leading-relaxed mb-4">
            This information may include your name, email address, phone number, and any other information you choose to provide.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">2.2 Automatically Collected Information</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            When you visit our website, we automatically collect certain information about your device, including:
          </p>
          <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring website addresses</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Send you job notifications and updates</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Send you newsletters and marketing communications (with your consent)</li>
            <li>Analyze website usage and trends</li>
            <li>Prevent fraud and ensure website security</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Information Sharing and Disclosure</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
          </p>
          <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
            <li><strong>Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf</li>
            <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal requests</li>
            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
            <li><strong>With Your Consent:</strong> We may share information with your explicit consent</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Security</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Your Rights</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
            <li>Access and receive a copy of your personal information</li>
            <li>Rectify inaccurate or incomplete information</li>
            <li>Request deletion of your personal information</li>
            <li>Object to processing of your personal information</li>
            <li>Request restriction of processing</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Cookies and Tracking Technologies</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Third-Party Links</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Children's Privacy</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Changes to This Privacy Policy</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Contact Us</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
            <p className="text-slate-700 mb-2">
              <strong>Email:</strong> privacy@nextplan.com
            </p>
            <p className="text-slate-700 mb-2">
              <strong>Address:</strong> NextPlan, India
            </p>
            <p className="text-slate-700">
              <strong>Phone:</strong> +91-XXXXXXXXXX
            </p>
          </div>
        </section>
      </article>
    </div>
  )
}

