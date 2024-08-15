import { exportToExcel } from '@/lib/exportToExcel'
import { exportToPDF } from '@/lib/exportToPDF'

export function useExport() {
  return {
    exportToExcel,
    exportToPDF,
  }
}
