export const createReview = async (review: {
  rating: number;
  text: string;
  images: File[];
  meetingId: number;
}) => {
  console.log('createReview', review);
  return;
  // const formData = new FormData();
  // review.images.forEach((image) => {
  //   formData.append('files', image);
  // });
  // const jsonData = JSON.stringify({
  //   rating: review.rating,
  //   text: review.text,
  // });
  // formData.append('data', jsonData);
  // await axiosInstance.post(`/meetings/${review.meetingId}/reviews`, formData);
  // return;
};

export const updateReview = async (review: {
  reviewId: number;
  rating: number;
  content: string;
  existingImages: string[];
  newImages: File[];
}) => {
  console.log('updateReview', review);
  return;
  // const formData = new FormData();
  // review.newImages.forEach((image) => {
  //   formData.append('files', image);
  // });
  // const jsonData = JSON.stringify({
  //   rating: review.rating,
  //   text: review.content,
  //   existingImages: review.existingImages,
  // });
  // formData.append('data', jsonData);
  // await axiosInstance.patch(`/reviews/${review.reviewId}`, formData);
  // return;
};

export const deleteReview = async ({ reviewId }: { reviewId: number }) => {
  console.log('deleteReview', reviewId);
  return;
  // await axiosInstance.delete(`/reviews/${reviewId}`);
  // return;
};
