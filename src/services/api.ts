import axios from 'axios';

const api = axios.create({
  baseURL: 'https://boasorte.teddybackoffice.com.br',
});


interface ClientData {
  name: string;
  companyValuation: number;
  salary: number;
}

export const getUsers = async (page: number, limit: number) => {
  try {
    const response = await api.get(`/users?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os dados da API:', error);
    throw new Error(`Erro ao buscar os dados da API: ${error.message}`);
  }
};

export const createClient = async (clientData: ClientData) => {
  try {
    const response = await api.post('/users', clientData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    if (axios.isAxiosError(error)) {
      console.error('Erro Axios:', error.response?.data);
      console.error('Erro Status:', error.response?.status);
      console.error('Erro Headers:', error.response?.headers);
    } else {
      console.error('Erro não relacionado ao Axios:', error.message);
    }

    throw new Error(`Erro ao criar cliente: ${error.message}`);
  }
};
export const updateClient = async (userId: string, clientData: ClientData) => {
  try {
    const response = await api.patch(`/users/${userId}`, clientData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    throw new Error(`Erro ao atualizar cliente: ${error.message}`);
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await api.delete(`/users/${id}`);
    console.log(`Usuário com ID ${id} removido com sucesso!`, response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao remover usuário:", error);
    throw new Error(`Erro ao remover usuário: ${error.message}`);
  }
};

export default api;
