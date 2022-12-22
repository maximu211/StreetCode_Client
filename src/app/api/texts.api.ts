import Agent from "./agent.api";
import { API_ROUTES } from "app/common/contants/routes.constants";
import { Text } from "models/streetcode/text-contents.model";

const TextsApi = {
    getAll: () =>
       Agent.get<Text[]>(`${API_ROUTES.TEXTS.GET_ALL}`),

    getById: (id: number) =>
        Agent.get<Text[]>(`${API_ROUTES.TEXTS.GET}/${id}`),

    create: (text: Text) =>
        Agent.post<Text>(`${API_ROUTES.TEXTS.CREATE}`, text),

    update: (text: Text) =>
        Agent.put<Text>(`${API_ROUTES.TEXTS.UPDATE}`, text),

    delete: (id: number) =>
        Agent.delete(`${API_ROUTES.TEXTS.DELETE}/${id}`),
}

export default TextsApi;