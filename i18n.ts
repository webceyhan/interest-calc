import type { Language } from "@/types";

// Helper function to uppercase strings correctly for Turkish
const toUpperCase = (str: string): string => {
  return str
    .replace(/i/g, "İ")
    .replace(/ı/g, "I")
    .toUpperCase();
};

export const messages: Record<Language, Record<string, string>> = {
  en: {
    title: "Deposit Interest Calculator",
    subtitle: "Calculate your deposit's final amount instantly",
    termDays: "Term Days",
    amount: "Deposit Amount",
    interestRate: "Annual Interest Rate",
    compoundInterest: "Compound Interest",
    dayCount: "Day Count",
    interestRateLabel: "Interest Rate",
    withholdingRate: "Withholding Rate",
    withholdingAmount: "Withholding Amount",
    netInterest: "Net Interest Amount",
    finalAmount: "Final Amount",
    reservationAmount: "Reserved Amount",
    compare: "Compare",
    comparisons: "Comparison",
    bankName: "Bank Name",
    enterBankName: "Enter bank name",
    remove: "Remove",
    clearAll: "Clean",
    reset: "Reset",
    rounded: "Rounded",
    precise: "Precise",
    noComparisons: "No comparisons yet",
    addBanksToCompare: "Click the Compare button to add banks, or hit Reset to load examples",
    comparisonStep1: "Fill in the details",
    comparisonStep2: "Press on Compare button",
    comparisonStep3: "Give a name and submit",
    share: "Share",
    copied: "Copied!",
    save: "Save",
    cancel: "Cancel",
  },
  tr: {
    title: "Mevduat Faizi Hesaplama",
    subtitle: "Mevduatınızın vade sonu tutarını anında hesaplayın",
    termDays: "Vade Gün Sayısı",
    amount: "Mevduat Tutarı",
    interestRate: "Yıllık Faiz Oranı",
    compoundInterest: "Bileşik Faiz",
    dayCount: "Gün Sayısı",
    interestRateLabel: "Faiz Oranı",
    withholdingRate: "Stopaj Oranı",
    withholdingAmount: "Stopaj Tutarı",
    netInterest: "Net Faiz Tutarı",
    finalAmount: "Vade Sonu Net Tutar",
    reservationAmount: "Rezerve Tutar",
    compare: "Karşılaştır",
    comparisons: "Karşılaştırma",
    bankName: "Banka Adı",
    enterBankName: "Banka adını giriniz",
    remove: "Kaldır",
    clearAll: "Temizle",
    reset: "Sıfırla",
    rounded: "Yuvarla",
    precise: "Kesin",
    noComparisons: "Henüz karşılaştırma yok",
    addBanksToCompare: "Banka eklemek için Karşılaştır butonuna tıklayın veya örnekler için Sıfırla'ya basın",
    comparisonStep1: "Detayları doldurun",
    comparisonStep2: "Karşılaştır butonuna basın",
    comparisonStep3: "Banka adını girin ve gönder",
    share: "Paylaş",
    copied: "Kopyalandı!",
    save: "Kaydet",
    cancel: "İptal",
  },
};

export { toUpperCase };
