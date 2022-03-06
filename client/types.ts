export interface Post {
    indentifier: string
    title: string
    body?: string
    slug: string
    username: string
    subName: string
    createdAt: string
    updatedAt: string
    //Virtual field
    url: string
}