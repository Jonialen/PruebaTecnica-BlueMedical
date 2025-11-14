// user.dto.ts (src/dtos/user.dto.ts)

export interface RegisterUserDto {
    name: string;
    email: string;
    password: string;
}

export interface LoginUserDto {
    email: string;
    password: string;
}

export interface UserResponseDto {
    id: number;
    name: string;
    email: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export interface AuthResponseDto {
    user: UserResponseDto;
    token: string;
}

export const toUserResponse = (user: any): UserResponseDto => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
});