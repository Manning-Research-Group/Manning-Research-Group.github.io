// Pulls recent posts from Bluesky's public, unauthenticated API and renders
// them into #bluesky-feed. No login or API key needed:
// https://docs.bsky.app/docs/api/app-bsky-feed-get-author-feed

(function () {
  var HANDLE = "manningresearch.bsky.social";
  var POST_LIMIT = 5;

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function formatDate(iso) {
    var d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  function postUrlFromUri(uri, handle) {
    // at://did:plc:xxxx/app.bsky.feed.post/<rkey> -> https://bsky.app/profile/<handle>/post/<rkey>
    var parts = uri.split("/");
    var rkey = parts[parts.length - 1];
    return "https://bsky.app/profile/" + handle + "/post/" + rkey;
  }

  function renderPosts(items) {
    var container = document.getElementById("bluesky-feed");
    if (!container) return;

    if (!items.length) {
      container.innerHTML = "<p>No recent posts.</p>";
      return;
    }

    var html = items
      .map(function (item) {
        var post = item.post;
        var record = post.record || {};
        var text = escapeHtml(record.text || "");
        var link = postUrlFromUri(post.uri, post.author.handle);
        var date = record.createdAt ? formatDate(record.createdAt) : "";
        var isRepost = item.reason && item.reason.$type === "app.bsky.feed.defs#reasonRepost";
        var byline = isRepost
          ? "Reposted from @" + escapeHtml(post.author.handle)
          : "";

        return (
          '<div class="bluesky-post">' +
          '<p class="bluesky-post-text">' + text.replace(/\n/g, "<br>") + "</p>" +
          '<p class="bluesky-post-meta">' +
          (byline ? byline + " &middot; " : "") +
          '<a href="' + link + '" target="_blank" rel="noopener">' + date + "</a>" +
          "</p>" +
          "</div>"
        );
      })
      .join("");

    container.innerHTML = html;
  }

  function renderError() {
    var container = document.getElementById("bluesky-feed");
    if (!container) return;
    container.innerHTML =
      '<p>Couldn&rsquo;t load recent posts right now. <a href="https://bsky.app/profile/' +
      HANDLE +
      '" target="_blank" rel="noopener">View the feed on Bluesky</a>.</p>';
  }

  document.addEventListener("DOMContentLoaded", function () {
    var container = document.getElementById("bluesky-feed");
    if (!container) return;

    var url =
      "https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=" +
      encodeURIComponent(HANDLE) +
      "&limit=" +
      POST_LIMIT;

    fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error("Bluesky API error: " + res.status);
        return res.json();
      })
      .then(function (data) {
        renderPosts(data.feed || []);
      })
      .catch(function (err) {
        console.error(err);
        renderError();
      });
  });
})();
