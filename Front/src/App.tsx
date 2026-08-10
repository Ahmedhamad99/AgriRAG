import { Header } from "@/components/layout/Header";
import { PageContainer } from "@/components/layout/PageContainer";

import { UploadSection } from "@/features/upload/components/UploadSection";
import { DocumentsSection } from "@/features/documents/components/DocumentsSection";
import { ChatSection } from "@/features/chat/components/ChatSection";

function App() {
  return (
    <PageContainer>
      <Header />

      <main className="mt-10 space-y-10">
        <UploadSection />

        <DocumentsSection />

        <ChatSection />
      </main>
    </PageContainer>
  );
}

export default App;