(function () {
  var protectedClass = "js-hidden-link";

  function isDisabled(link, href) {
    return (
      href === "#" ||
      link.classList.contains("disabled") ||
      link.getAttribute("aria-disabled") === "true"
    );
  }

  function protectLink(link) {
    if (!link || link.tagName !== "A") {
      return;
    }

    var href = link.getAttribute("href");
    if (!href) {
      return;
    }

    if (isDisabled(link, href.trim())) {
      link.setAttribute("data-nav-disabled", "true");
      link.removeAttribute("href");
      return;
    }

    link.setAttribute("data-nav-href", href);
    link.removeAttribute("href");
    link.classList.add(protectedClass);

    if (!link.hasAttribute("role")) {
      link.setAttribute("role", "link");
    }

    if (!link.hasAttribute("tabindex")) {
      link.setAttribute("tabindex", "0");
    }

    if (link.classList.contains("image-popup") && !link.hasAttribute("data-mfp-src")) {
      link.setAttribute("data-mfp-src", href.trim());
    }

    if (link.target === "_blank" && !link.rel) {
      link.rel = "noopener";
    }
  }

  function protectLinks(root) {
    var scope = root || document;

    if (scope.tagName === "A") {
      protectLink(scope);
      return;
    }

    if (scope.querySelectorAll) {
      scope.querySelectorAll("a[href]").forEach(protectLink);
    }
  }

  function openLink(link, event) {
    var href = link.getAttribute("data-nav-href");

    if (!href || link.getAttribute("data-nav-disabled") === "true") {
      event.preventDefault();
      return;
    }

    if (link.classList.contains("image-popup")) {
      if (event.type === "keydown") {
        event.preventDefault();
        link.click();
      }

      return;
    }

    event.preventDefault();

    var url = href.trim();
    var target = link.getAttribute("target");
    var openInNewContext =
      event.button === 1 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      target === "_blank";

    if (openInNewContext) {
      window.open(url, target || "_blank", "noopener");
      return;
    }

    window.location.assign(url);
  }

  function closestProtectedLink(target) {
    if (!target || !target.closest) {
      return null;
    }

    return target.closest("a[data-nav-href], a[data-nav-disabled]");
  }

  function attachHandlers() {
    document.addEventListener("click", function (event) {
      var link = closestProtectedLink(event.target);
      if (!link || event.defaultPrevented) {
        return;
      }

      openLink(link, event);
    });

    document.addEventListener("auxclick", function (event) {
      var link = closestProtectedLink(event.target);
      if (!link || event.defaultPrevented || event.button !== 1) {
        return;
      }

      openLink(link, event);
    });

    document.addEventListener("keydown", function (event) {
      var link = closestProtectedLink(event.target);
      if (!link || event.defaultPrevented) {
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        openLink(link, event);
      }
    });
  }

  function watchNewLinks() {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === "attributes") {
          protectLink(mutation.target);
          return;
        }

        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) {
            protectLinks(node);
          }
        });
      });
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["href"],
    });
  }

  function insertPointerStyle() {
    var style = document.createElement("style");
    style.textContent = "a." + protectedClass + "{cursor:pointer}";
    document.head.appendChild(style);
  }

  function init() {
    protectLinks();
    attachHandlers();
    watchNewLinks();
    insertPointerStyle();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    window.setTimeout(init, 0);
  }
})();
