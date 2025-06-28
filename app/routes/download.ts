import { axiosInstanceV1 } from '@/lib/axios';

// 아직 동작 X
export async function handleDownload(file: string) {
  const encodedPdfUrl = encodeURIComponent(file);

  try {
    const response = await axiosInstanceV1({
      method: 'GET',
      url: `/api/web/v1/guidbooks/download?pdf=${encodedPdfUrl}`,
      responseType: 'blob',
    });

    const fileName = decodeURIComponent(
      file.split('/').pop() ?? 'guidebook.pdf',
    );

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('PDF 다운로드 실패:', error);
  }
}
