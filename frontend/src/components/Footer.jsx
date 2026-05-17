export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-20 border-t">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-sm text-gray-600">
        <div>
          <h3 className="text-lg font-bold text-emerald-600 mb-3">QuizUp</h3>
          <p>Making learning awesome for millions of people around the world.</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Product</h4>
          <ul className="space-y-2">
            <li>Features</li>
            <li>Pricing</li>
            <li>Templates</li>
            <li>Enterprise</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Resources</h4>
          <ul className="space-y-2">
            <li>Help Center</li>
            <li>Blog</li>
            <li>Community</li>
            <li>Teachers Guide</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Company</h4>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>

      <div className="border-t text-center text-sm text-gray-500 py-4">
        © 2026 QuizUp. All rights reserved.
      </div>
    </footer>
  );
}