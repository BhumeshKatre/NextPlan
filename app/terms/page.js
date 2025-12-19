import Breadcrumb from '../components/Breadcrumb'

export const metadata = {
  title: 'Terms & Conditions | NextPlan',
  description: 'Read our Terms and Conditions to understand the rules and regulations for using NextPlan services.',
}

export default function TermsAndConditions() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Terms & Conditions' },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Breadcrumb items={breadcrumbItems} />
      
      <article className="prose prose-slate max-w-none">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Terms & Conditions</h1>
        <p className="text-slate-600 mb-8">
          <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            By accessing and using NextPlan ("the Website"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Use License</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            Permission is granted to temporarily access the materials on NextPlan's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to decompile or reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. User Accounts</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Content and Information</h2>
          <h3 className="text-xl font-semibold text-slate-800 mb-3">4.1 Accuracy of Information</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            While we strive to provide accurate and up-to-date information about government jobs, schemes, and finance tips, we do not guarantee the accuracy, completeness, or timeliness of any information on the website. Users should verify all information independently before making any decisions.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mb-3">4.2 Third-Party Content</h3>
          <p className="text-slate-700 leading-relaxed mb-4">
            Our website may contain links to third-party websites or services that are not owned or controlled by NextPlan. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Prohibited Uses</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            You agree not to use the website:
          </p>
          <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
            <li>In any way that violates any applicable national or international law or regulation</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
            <li>To impersonate or attempt to impersonate the company, a company employee, another user, or any other person or entity</li>
            <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful</li>
            <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Intellectual Property</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            The website and its original content, features, and functionality are owned by NextPlan and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Disclaimer</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            The materials on NextPlan's website are provided on an 'as is' basis. NextPlan makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Limitations of Liability</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            In no event shall NextPlan or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on NextPlan's website, even if NextPlan or a NextPlan authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Indemnification</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            You agree to defend, indemnify, and hold harmless NextPlan and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Termination</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We may terminate or suspend your account and bar access to the website immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Governing Law</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            These Terms shall be interpreted and governed by the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Changes to Terms</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Contact Information</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            If you have any questions about these Terms & Conditions, please contact us:
          </p>
          <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
            <p className="text-slate-700 mb-2">
              <strong>Email:</strong> legal@nextplan.com
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

