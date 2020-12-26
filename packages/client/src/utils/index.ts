type FetchJson = (input: RequestInfo, init?: RequestInit | undefined) => any;

export const fetchJson: FetchJson = async (...args) => {
  const response = await fetch(...args);

  if (!response.ok) {
    throw Error(`${response.status} ${response.statusText}`);
  }

  return await response.json();
};

/**
 * @description previous callback gets cancelled
 * and the new callback starts to evaluate
 * (if this gets called before delay, the delay is over).
 *
 * using this for multiple callback functions is not a good idea right now.
 */
export const refreshableCallback = (() => {
  let t: any;
  return (f: (...a: any[]) => void | Promise<void>, delay: number) => {
    clearTimeout(t);
    t = (() => setTimeout(f, delay))();
  }
})();

// @TODO make this interesting.
export const constructString = (option: any) => (
  `${option.name} on ${option.year}`
);


export const fancyNumber = (n: number | null): string => {
  if (n != null) {
    return n >= 1000 ? (n / 1000.00).toString() + 'K' : n.toString();
  }
  return '--';
}

export const autocompleteNavigate = {
  next: (
    inputElement: HTMLInputElement | null,
    containerElement: HTMLElement | null
  ) => {
    const element = document.activeElement;
    if (element) {
      if (element === inputElement) {
        if (element.nextSibling) {
          // @ts-ignore
          (element.nextSibling.firstChild || inputElement).focus();
        }
      } else if (element.parentNode === containerElement) {
        // @ts-ignore
        (element.nextSibling || element.parentNode.firstChild).focus();
      }
    }
  },

  previous: (containerElement: HTMLElement | null) => {
    const element = document.activeElement;
    if (element && (element.parentNode === containerElement)) {
      // @ts-ignore
      (element.previousSibling || element.parentNode.lastChild).focus();
    }
  },
}

export const pareseUrlParams = (urlParamString: string): { [key: string]: string } => {
  if (urlParamString.startsWith('?')) {
    urlParamString = urlParamString.slice(1);
  }

  return urlParamString
    .split('&')
    .reduce((a, s) => {
      const [s1, s2] = s.split('=');
      a[s1] = s2;
      return a;
    }, {} as any);
}

export const fontFaceString = ({ node }: any) => `
@font-face {
  font-family: "${node.name}";
  font-display: swap;
  src: local("${node.publicURL}"),
    url("${node.publicURL}") format("${node.extension}");
}
`;

