(async () => {
  for (let i = 1; i <= 50; i++) {
    const res = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify({
        name: {
          string: "User " + i,
          valid: true,
        },
        email: "user" + i + "@example.com",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      console.log("Created user", i);
      const json = await res.json();

      for (let j = 1; j <= 100; j++) {
        const res = await fetch("http://localhost:8080/posts", {
          method: "POST",
          body: JSON.stringify({
            title: "Post " + j + " " + i,
            content: "Post content " + j + " " + i,
            slug: "post-slug-" + j + "-" + i,
            userId: json.ID,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          console.log("Created post", j);
        } else {
          console.error("Failed to create post", j);
        }
      }
    } else {
      console.error("Failed to create user", i);
    }
  }
})();
