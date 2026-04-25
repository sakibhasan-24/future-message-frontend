import SignupForm from "@/src/features/auth/components/Signupform";


export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81]">
      <SignupForm />
    </div>
  );
}