import { h } from "preact";

export function Link(props: h.JSX.IntrinsicElements["a"]) {
  return (
    /* eslint-disable jsx-a11y/anchor-has-content */
    <a class="c-link" data-transform="truncate" title={props.href} {...props} />
  );
}

export const Layout = (props: h.JSX.IntrinsicElements["section"]) => {
  return (
    /* eslint-disable jsx-a11y/anchor-has-content */
    <section
      data-mt="24"
      data-mx="auto"
      data-md-pl="6"
      data-md-pr="3"
      data-max-width="1296"
      data-width="100%"
      {...props}
    >
      {props.children}
    </section>
  );
};
