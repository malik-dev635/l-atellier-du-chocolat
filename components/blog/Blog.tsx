import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { RevealImage } from "@/components/ui/RevealImage";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { BLOG_SECTION, POSTS } from "@/lib/mocks";
import styles from "./Blog.module.css";

/**
 * Blog : trois cartes sans chrome (image, badge catégorie en incrustation,
 * date • auteur, titre serif, lien souligné) et un bouton fantôme centré.
 */
export function Blog(): ReactNode {
  return (
    <section id="blog" className="section section--white" aria-labelledby="blog-title">
      <div className="container-narrow">
        <header className={styles.head}>
          <Eyebrow align="center">{BLOG_SECTION.eyebrow}</Eyebrow>
          <SectionTitle id="blog-title">{BLOG_SECTION.title}</SectionTitle>
        </header>

        <Reveal>
          <ul className={styles.grid}>
            {POSTS.map((post) => (
              <li key={post.id} className={styles.card} data-reveal>
                <a className={styles.link} href={post.href}>
                  <div className={styles.mediaWrap}>
                    <RevealImage
                      src={post.image}
                      alt={post.title}
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                      className={styles.media}
                    />
                    <span className={styles.badge}>{post.category}</span>
                  </div>

                  <p className={styles.meta}>
                    <time>{post.date}</time>
                    <span aria-hidden="true">•</span>
                    <span>{post.author}</span>
                  </p>

                  <h3 className={styles.title}>{post.title}</h3>

                  <span className={`link-more ${styles.more}`}>Lire l&apos;article</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className={styles.cta}>
          <Button href="/#blog">{BLOG_SECTION.cta}</Button>
        </div>
      </div>
    </section>
  );
}
