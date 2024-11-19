import axiosInstance from "./axiosInstance";

export async function getUserExhibits() {
  const response = await axiosInstance.get("/api/exhibits/my-posts");
  return response;
}

export const getAllExhibits = async (page: string = "1") => {
  const response = await axiosInstance.get(`/api/exhibits?page=${page}`);
  return response;
};

export async function createExhibit(description: string, file: File) {
  const formData = new FormData();

  formData.append("image", file);
  formData.append("description", description);
  const response = await axiosInstance
    .post(`/api/exhibits`, formData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
  return response;
}

export async function getExhibitById(id: string) {
  const response = await axiosInstance.get(`/api/exhibits/post/${id}`);
  console.log("exhibit by id", response, id);
  return response;
}

export async function deleteExhibit(id: string) {
  const response = await axiosInstance.delete(`/api/exhibits/${id}`);
  return response;
}

export async function deleteExhibitComment(
  exhibitId: string,
  commentId: string
) {
  const response = await axiosInstance.delete(
    `/api/exhibits/${exhibitId}/comments/${commentId}`
  );
  return response;
}
