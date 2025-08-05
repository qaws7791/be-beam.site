import { useParams } from 'react-router';
import { Suspense } from 'react';
import useGuideBookQuery from '@/hooks/api/useGuideBookQuery';
import { getGuideBookPdf } from '@/api/guideBooks';
import { metaTemplates } from '@/config/meta-templates';

import Slider from '@/components/organisms/Slider';
import { Button } from '@/components/atoms/button/Button';
import GuideBookDetailContent from '@/components/sections/GuideBookDetailContent';
import GuideBookRecommendation from '@/components/sections/GuideBookRecommendation';
import CommonTemplate from '@/components/templates/CommonTemplate';
import LoadingSpinner from '@/components/molecules/LoadingSpinner';

export function meta() {
  return metaTemplates.guideBookDetail();
}

export default function GuideBookDetail() {
  const id = Number(useParams().guideBookId);
  const { data: guideBook } = useGuideBookQuery(id);

  const handleDownload = (blobData: Blob, fileName: string) => {
    const blob = new Blob([blobData], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  const handleDownloadClick = async () => {
    if (!guideBook || !guideBook.file) {
      alert('가이드북 파일 정보가 없습니다.');
      return;
    } else {
      const pdfBlob = await getGuideBookPdf(guideBook);

      handleDownload(pdfBlob, `${guideBook.title}_BE:BEAM 가이드북`);
    }
  };

  return (
    <CommonTemplate>
      <Suspense fallback={<LoadingSpinner />}>
        {!guideBook ? (
          <p>가이드북 정보를 찾을 수 없습니다.</p>
        ) : (
          <div className="flex items-start gap-10">
            <div className="sticky top-[100px] w-full max-w-[500px] self-start">
              <Slider
                images={guideBook.images}
                delay={5000}
                isCount={true}
                slideWidth="w-full"
                slideHeight="h-[480px]"
              />
              <Button
                onClick={handleDownloadClick}
                className="mt-4 min-w-full gap-1 py-8 text-t3 text-white"
              >
                <img src="/images/icons/w_download.svg" alt="download_icon" />
                가이드북 다운로드 받기
              </Button>
            </div>

            <div className="flex-1">
              <GuideBookDetailContent guideBook={guideBook} />
              <GuideBookRecommendation
                recommendationData={guideBook.recommendations}
              />
            </div>
          </div>
        )}
      </Suspense>
    </CommonTemplate>
  );
}
