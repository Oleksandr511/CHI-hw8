import axiosInstance from "./axiosInstance";

export async function getUserExhibits() {
  try {
    const response = await axiosInstance.get("/api/exhibits/my-posts");
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllExhibits(page: string = "1") {
  try {
    const response = await axiosInstance.get(`/api/exhibits?page=${page}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function createExhibit(description: string, file: File) {
  const formData = new FormData();

  formData.append("image", file);
  formData.append("description", description);
  try {
    const response = await axiosInstance
      .post(`/api/exhibits`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
    // console.log(response.data);
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getExhibitById(id: string) {
  try {
    const response = await axiosInstance.get(`/api/exhibits/post/${id}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
