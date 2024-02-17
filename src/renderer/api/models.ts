export type GetUsersApiModel = {
    id?: string;
    login?: string;
}

export type GetUsersApiResponse = {
    data: IUserInfo[];
}

export interface IUserInfo {
    id: string;
    login: string;
    display_name: string;
    type: string;
    broadcaster_type: string;
    description: string;
    profile_image_url: string;
    offline_image_url: string;
    email: string;
    created_at: string;
}