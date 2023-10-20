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
    // static parse(json: string) {
    //     const data = JSON.parse(json);

    //     const explicitContent: ExplicitContent = {
    //         filterEnabled: data.explicit_content.filter_enabled,
    //         filterLocked: data.explicit_content.filter_locked
    //     }

    //     const externalUrls: ExternalUrls = {
    //         spotify: data.external_urls.spotify,
    //         customs: []
    //     }

    //     const followers: Followers = {
    //         href: data.followers.href,
    //         total: data.followers.total
    //     }

    //     const user: User = {
    //         country: data.country,
    //         displayName: data.display_name,
    //         email: data.email,
    //         explicitContent: explicitContent,
    //         externalUrls: externalUrls,
    //         followers: followers,
    //         href: data.href,
    //         id: data.id,
    //         images: data.images,
    //         product: data.product,
    //         uri: data.uri
    //     };

    //     return user;
    // }
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
}