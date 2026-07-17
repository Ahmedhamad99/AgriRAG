from app.rag.loader import PDFLoader

loader = PDFLoader()

pages = loader.load("data/pdfs/plant_diseases.pdf")

print(f"Total Pages: {len(pages)}")

for page in pages[:5]:
    print("=" * 50)
    print(f"Page Number: {page.page_number}")
    print(f"Text Length: {len(page.text)}")
    print(page.text[:150])