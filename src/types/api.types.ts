export type ServerResponse<T extends object> = T & {
    success: boolean;
};
