export type User = {
    id: number,
    username: string,
    tel: string,
    email: string,
    headerUrl: string,
    createTime: string,
}

export type Post = {
    id: number,
    title: string,
    content: string,
    type: number,
    status: number,
    createTime: string,
    commentCount: number
}

// ================================================ pagination ================================================

// 用于前端渲染分页组件
export type PaginationData = {
    current: number,                    // 当前页号
    limit: number,                      // 每页显示数据的数量
    count: number,                      // 总数据数量
}

// ================================================= register =================================================
export type RegisterFormData = {
    account: string,
    password: string,
}

export type RegisterResponseBody = {
    userId?: string,
    activateCode?: string,
    accountMsg?: string,
    passwordMsg?: string,
}

// ================================================ login ================================================
export type LoginFormData = {
    account: string,
    password: string,
    kaptcha: string,
    rememberMe: boolean,
}
export type LoginResponseBody = {
    accountMsg?: string,
    passwordMsg?: string,
    codeMsg?: string,
    loginMsg?: string,
}

// ================================================ settings ================================================
export type UpdataAvatarResponseBody = {
    updateAvatar: string,
}

// ================================================ publish ================================================
export type PublishFormData = {
    title: string,
    content: string,
}
export type PublishResponseBody = {
    code: string,
    msg: string,
}


// ====================================================================================================
declare type Comment = {
    postId: string,
    userId: string,
    entityType: number,
    entityId: number,
    targetId: number,
    content: string,
}

// declare const Topic: "comment" | "like" | "follow"
// export { Topic }

// =====================================================================================
export type EndpointParams = {
	pathParams?: any[],
    requestParams?: any[],
	formData?: BodyInit | string
}