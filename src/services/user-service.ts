import api from "./api";

export const getUsers = async (page: number, limit: number) => {
    try {
        const response = await api.get(`/users?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar os dados da API', error);
        throw error;
    }
};


