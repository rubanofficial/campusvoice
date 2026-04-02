

// import { Link } from 'react-router-dom';
// import { Shield, FileText, Search, UserX, User, ArrowRight, Lock, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
// import { PublicLayout } from '@/components/PublicLayout';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// export default function LandingPage() {
//   return (
//     <PublicLayout>
//       {/* Hero Section - More Compact & Premium */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 py-12 md:py-16">
//         <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />

//         <div className="container mx-auto px-4 sm:px-6 relative">
//           <div className="max-w-4xl mx-auto">
//             {/* Trust Badge */}
//             <div className="flex justify-center mb-6">
//               <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/15 to-accent/15 backdrop-blur-sm border border-primary/20 text-primary px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
//                 <Shield className="h-3.5 w-3.5" />
//                 Secure & Confidential Platform
//               </div>
//             </div>

//             <div className="text-center space-y-4">
//               <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight">
//                 CampusVoice
//               </h1>

//               <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
//                 Submit complaints securely with complete confidentiality. Choose anonymous or identified submissions.
//                 <span className="inline-block mt-1 text-foreground font-semibold"> No login required.</span>
//               </p>

//               <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
//                 <Link to="/submit/identified" className="w-full sm:w-auto">
//                   <Button size="lg" className="w-full sm:w-auto gap-2 shadow-lg hover:shadow-xl transition-all">
//                     <FileText className="h-4 w-4" />
//                     Submit Complaint
//                   </Button>
//                 </Link>
//                 <Link to="/track" className="w-full sm:w-auto">
//                   <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 border-2 hover:bg-accent/5">
//                     <Search className="h-4 w-4" />
//                     Track Status
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stats Bar */}
//         <div className="container mx-auto px-4 sm:px-6 mt-10">
//           <div className="max-w-4xl mx-auto">
//             <div className="grid grid-cols-3 gap-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-sm">
//               <div className="text-center">
//                 <div className="text-xl md:text-2xl font-bold text-primary">48hrs</div>
//                 <div className="text-xs text-muted-foreground font-medium">Review Time</div>
//               </div>
//               <div className="text-center border-x border-border/50">
//                 <div className="text-xl md:text-2xl font-bold text-primary">100%</div>
//                 <div className="text-xs text-muted-foreground font-medium">Confidential</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-xl md:text-2xl font-bold text-primary">24/7</div>
//                 <div className="text-xs text-muted-foreground font-medium">Available</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Submission Options - Tighter & More Professional */}
//       <section className="py-12 md:py-16 bg-background">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl md:text-3xl font-bold mb-2">Choose Submission Type</h2>
//             <p className="text-sm text-muted-foreground max-w-xl mx-auto">
//               Both methods are treated with equal priority and confidentiality
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
//             {/* Anonymous Card - Enhanced */}
//             <Card className="relative overflow-hidden border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-xl group">
//               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-full" />

//               <CardHeader className="pb-3">
//                 <div className="flex items-start justify-between">
//                   <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
//                     <UserX className="h-6 w-6 text-accent" />
//                   </div>
//                   <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded-full">
//                     Popular
//                   </span>
//                 </div>
//                 <CardTitle className="text-lg">Anonymous Submission</CardTitle>
//                 <CardDescription className="text-xs">
//                   Complete privacy, no personal details required
//                 </CardDescription>
//               </CardHeader>

//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <div className="flex items-start gap-2 text-xs">
//                     <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
//                     <span className="text-muted-foreground">Full identity protection</span>
//                   </div>
//                   <div className="flex items-start gap-2 text-xs">
//                     <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
//                     <span className="text-muted-foreground">Zero personal information needed</span>
//                   </div>
//                   <div className="flex items-start gap-2 text-xs">
//                     <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
//                     <span className="text-muted-foreground">Track via unique Complaint ID</span>
//                   </div>
//                   <div className="flex items-start gap-2 text-xs">
//                     <AlertCircle className="h-4 w-4 text-muted-foreground/40 mt-0.5 flex-shrink-0" />
//                     <span className="text-muted-foreground/60">No personalized follow-ups</span>
//                   </div>
//                 </div>

//                 <Link to="/submit/anonymous" className="block">
//                   <Button className="w-full gap-2 shadow-md hover:shadow-lg transition-all" size="default">
//                     Submit Anonymously
//                     <ArrowRight className="h-4 w-4" />
//                   </Button>
//                 </Link>
//               </CardContent>
//             </Card>

//             {/* Identified Card - Enhanced */}
//             <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
//               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />

//               <CardHeader className="pb-3">
//                 <div className="flex items-start justify-between">
//                   <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
//                     <User className="h-6 w-6 text-primary" />
//                   </div>
//                   <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
//                     Recommended
//                   </span>
//                 </div>
//                 <CardTitle className="text-lg">Identified Submission</CardTitle>
//                 <CardDescription className="text-xs">
//                   Faster resolution with direct communication
//                 </CardDescription>
//               </CardHeader>

//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <div className="flex items-start gap-2 text-xs">
//                     <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
//                     <span className="text-muted-foreground">Personalized case updates</span>
//                   </div>
//                   <div className="flex items-start gap-2 text-xs">
//                     <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
//                     <span className="text-muted-foreground">Direct communication channel</span>
//                   </div>
//                   <div className="flex items-start gap-2 text-xs">
//                     <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
//                     <span className="text-muted-foreground">Complete ID tracking access</span>
//                   </div>
//                   <div className="flex items-start gap-2 text-xs">
//                     <Lock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
//                     <span className="text-muted-foreground">Data remains confidential</span>
//                   </div>
//                 </div>

//                 <Link to="/submit/identified" className="block">
//                   <Button variant="outline" className="w-full gap-2 border-2 hover:bg-primary/5" size="default">
//                     Submit With Identity
//                     <ArrowRight className="h-4 w-4" />
//                   </Button>
//                 </Link>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* How It Works - Streamlined */}
//       <section className="py-12 md:py-16 bg-gradient-to-b from-muted/30 to-background">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl md:text-3xl font-bold mb-2">Simple Process</h2>
//             <p className="text-sm text-muted-foreground">Three easy steps to resolution</p>
//           </div>

//           <div className="max-w-4xl mx-auto">
//             <div className="grid md:grid-cols-3 gap-6">
//               {/* Step 1 */}
//               <div className="relative">
//                 <div className="bg-card border-2 border-border rounded-xl p-5 hover:border-primary/50 transition-all hover:shadow-lg group">
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-lg flex items-center justify-center text-base font-bold shadow-md">
//                       1
//                     </div>
//                     <h3 className="font-semibold text-sm">Submit Details</h3>
//                   </div>
//                   <p className="text-xs text-muted-foreground leading-relaxed">
//                     Describe your complaint and attach supporting documents if available
//                   </p>
//                 </div>
//                 {/* Connector Line - Hidden on mobile */}
//                 <div className="hidden md:block absolute top-5 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -z-10" />
//               </div>

//               {/* Step 2 */}
//               <div className="relative">
//                 <div className="bg-card border-2 border-border rounded-xl p-5 hover:border-primary/50 transition-all hover:shadow-lg group">
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-lg flex items-center justify-center text-base font-bold shadow-md">
//                       2
//                     </div>
//                     <h3 className="font-semibold text-sm">Receive ID</h3>
//                   </div>
//                   <p className="text-xs text-muted-foreground leading-relaxed">
//                     Get a unique tracking ID to monitor your complaint's progress
//                   </p>
//                 </div>
//                 <div className="hidden md:block absolute top-5 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -z-10" />
//               </div>

//               {/* Step 3 */}
//               <div className="relative">
//                 <div className="bg-card border-2 border-border rounded-xl p-5 hover:border-primary/50 transition-all hover:shadow-lg group">
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-lg flex items-center justify-center text-base font-bold shadow-md">
//                       3
//                     </div>
//                     <h3 className="font-semibold text-sm">Track & Resolve</h3>
//                   </div>
//                   <p className="text-xs text-muted-foreground leading-relaxed">
//                     Monitor status anytime with your ID—no login or registration needed
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Trust Footer - Compact & Professional */}
//       <section className="py-6 bg-card border-t-2 border-border">
//         <div className="container mx-auto px-4 sm:px-6">
//           <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
//             <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
//               <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
//                 <Shield className="h-4 w-4 text-accent" />
//               </div>
//               <span>End-to-end Encrypted</span>
//             </div>
//             <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
//               <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
//                 <Clock className="h-4 w-4 text-primary" />
//               </div>
//               <span>48-hour Review SLA</span>
//             </div>
//             <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
//               <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
//                 <Lock className="h-4 w-4 text-accent" />
//               </div>
//               <span>Confidentiality Guaranteed</span>
//             </div>
//           </div>
//         </div>
//       </section>
//     </PublicLayout>
//   );
// }

import { Link } from 'react-router-dom';
import { Shield, FileText, Search, UserX, User, ArrowRight, Lock, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { PublicLayout } from '@/components/PublicLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LandingPage() {
  const scrollToSubmissionOptions = () => {
    const element = document.getElementById('submission-options');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <PublicLayout>
      {/* Hero Section - More Compact & Premium */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/5 py-12 md:py-16">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />

        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-4xl mx-auto">
            {/* Trust Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/15 to-accent/15 backdrop-blur-sm border border-primary/20 text-primary px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                <Shield className="h-3.5 w-3.5" />
                Secure & Confidential Platform
              </div>
            </div>

            <div className="text-center space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
                CampusVoice
              </h1>

              <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-snug px-4">
                Submit complaints securely with complete confidentiality. Choose anonymous or identified submissions.{" "}
                <span className="text-foreground font-semibold">No login required.</span>
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-3">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-2 shadow-lg hover:shadow-xl transition-all px-8 py-6 text-base"
                  onClick={scrollToSubmissionOptions}
                >
                  <FileText className="h-5 w-5" />
                  Submit Complaint
                </Button>
                <Link to="/track" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 border-2 hover:bg-accent/5 px-8 py-6 text-base">
                    <Search className="h-5 w-5" />
                    Track Status
                  </Button>
                </Link>
              </div>
            </div>
            {/* Stats Bar */}
            <div className="container mx-auto px-4 sm:px-6 mt-12">
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-3 gap-6 md:gap-8 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 md:p-8 shadow-sm">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">48hrs</div>
                    <div className="text-xs md:text-sm text-muted-foreground font-medium mt-1">Review Time</div>
                  </div>
                  <div className="text-center border-x border-border/50">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">100%</div>
                    <div className="text-xs md:text-sm text-muted-foreground font-medium mt-1">Confidential</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">24/7</div>
                    <div className="text-xs md:text-sm text-muted-foreground font-medium mt-1">Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}


      </section>

      {/* Submission Options - Tighter & More Professional */}
      <section id="submission-options" className="py-12 md:py-16 bg-background scroll-mt-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Choose Submission Type</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Both methods are treated with equal priority and confidentiality
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
            {/* Anonymous Card - Enhanced */}
            <Card className="relative overflow-hidden border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-xl group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-full" />

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <UserX className="h-6 w-6 text-accent" />
                  </div>
                  {/* <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded-full">
                    Popular
                  </span> */}
                </div>
                <CardTitle className="text-lg">Anonymous Submission</CardTitle>
                <CardDescription className="text-xs">
                  Complete privacy, no personal details required
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Full identity protection</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Zero personal information needed</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Track via unique Complaint ID</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <AlertCircle className="h-4 w-4 text-muted-foreground/40 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground/60">No personalized follow-ups</span>
                  </div>
                </div>

                <Link to="/submit/anonymous" className="block">
                  <Button className="w-full gap-2 shadow-md hover:shadow-lg transition-all" size="default">
                    Submit Anonymously
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Identified Card - Enhanced */}
            <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  {/* <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                    Recommended
                  </span> */}
                </div>
                <CardTitle className="text-lg">Identified Submission</CardTitle>
                <CardDescription className="text-xs">
                  Faster resolution with direct communication
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Personalized case updates</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Direct communication channel</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Complete ID tracking access</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <Lock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">Data remains confidential</span>
                  </div>
                </div>

                <Link to="/submit/identified" className="block">
                  <Button variant="outline" className="w-full gap-2 border-2 hover:bg-primary/5" size="default">
                    Submit With Identity
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works - Streamlined */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Simple Process</h2>
            <p className="text-sm text-muted-foreground">Three easy steps to resolution</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="relative">
                <div className="bg-card border-2 border-border rounded-xl p-5 hover:border-primary/50 transition-all hover:shadow-lg group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-lg flex items-center justify-center text-base font-bold shadow-md">
                      1
                    </div>
                    <h3 className="font-semibold text-sm">Submit Details</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Describe your complaint and attach supporting documents if available
                  </p>
                </div>
                {/* Connector Line - Hidden on mobile */}
                <div className="hidden md:block absolute top-5 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -z-10" />
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="bg-card border-2 border-border rounded-xl p-5 hover:border-primary/50 transition-all hover:shadow-lg group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-lg flex items-center justify-center text-base font-bold shadow-md">
                      2
                    </div>
                    <h3 className="font-semibold text-sm">Receive ID</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Get a unique tracking ID to monitor your complaint's progress
                  </p>
                </div>
                <div className="hidden md:block absolute top-5 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -z-10" />
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="bg-card border-2 border-border rounded-xl p-5 hover:border-primary/50 transition-all hover:shadow-lg group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-lg flex items-center justify-center text-base font-bold shadow-md">
                      3
                    </div>
                    <h3 className="font-semibold text-sm">Track & Resolve</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Monitor status anytime with your ID—no login or registration needed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Footer - Compact & Professional */}
      <section className="py-6 bg-card border-t-2 border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <Shield className="h-4 w-4 text-accent" />
              </div>
              <span>End-to-end Encrypted</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <span>48-hour Review SLA</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                <Lock className="h-4 w-4 text-accent" />
              </div>
              <span>Confidentiality Guaranteed</span>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}