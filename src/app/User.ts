export class ExplicitContent {
    filter_enabled!: boolean;
    filter_locked!: boolean;
}

export class CustomUrl {
    name!: string;
    url!: string;
}

export class ExternalUrls {
    spotify!: string;
    customs!: CustomUrl[];
}

export class Followers {
    href: string | undefined;
    total!: number;
}

export class User {
    country!: string;
    display_name!: string;
    email!: string;
    explicit_content!: ExplicitContent;
    external_urls!: ExternalUrls;
    followers!: Followers;
    href!: string;
    id!: string;
    images: string[] = [];
    product!: string;
    uri!: string;
    type!: string;
}