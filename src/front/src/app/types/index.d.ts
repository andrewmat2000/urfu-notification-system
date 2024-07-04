declare module "*bmp" {
    const src: string;
    export default src;
}

declare module "*git" {
    const src: string;
    export default src;
}

declare module "*jpg" {
    const src: string;
    export default src;
}

declare module "*jpeg" {
    const src: string;
    export default src;
}

declare module "*png" {
    const src: string;
    export default src;
}

declare module "*wepb" {
    const src: string;
    export default src;
}

declare module "*.svg" {
    const src: string;
    export default src;
}

declare module "*.module.scss" {
    const classNames: { [clasName: string]: string };
    export = classNames;
}

declare module "*.module.css" {
    const classNames: { [clasName: string]: string };
    export = classNames;
}

declare const __IS_DEV__: boolean;
declare const __API_URL__: string;
