import { Pipe, PipeTransform } from "@angular/core";
import { Post } from "./interfaces";

@Pipe({
  name: "filterType",
})
export class FilterPipe implements PipeTransform {
  transform(posts: Post[], type = ""): Post[] {
    if (!type || type === "all") {
      return posts;
    }

    let filteredPosts = posts.filter((post) => {
      return post.type === type;
    });

    return this.getPostsByColor(filteredPosts);
  }

  getPostsByColor(posts): Post[] {
    let updatedPosts = [];
    posts.forEach((item, index) => {
      let post = item;
      if (index === 0) {
        post = { ...post, color: "green" };
      } else {
        if (updatedPosts[updatedPosts.length - 1].color === "green") {
          post = { ...post, color: "orange" };
        } else if (updatedPosts[updatedPosts.length - 1].color === "orange") {
          post = { ...post, color: "blue" };
        } else if (updatedPosts[updatedPosts.length - 1].color === "blue") {
          post = { ...post, color: "green" };
        }
      }
      updatedPosts.push(post);
    });

    return updatedPosts;
  }
}
