import React, { useEffect, useRef, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow};
  }

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;

      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
        text-align: left;
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }
    .project-tech-list {
      justify-content: flex-end;

      @media (max-width: 768px) {
        justify-content: flex-start;
      }

      li {
        margin: 0 0 5px 20px;

        @media (max-width: 768px) {
          margin: 0 10px 5px 0;
        }
      }
    }
    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: -10px;
        margin-right: 0;
      }
    }
    .project-image {
      grid-column: 1 / 8;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }

  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      grid-column: 1 / -1;
      padding: 40px 40px 30px;
      z-index: 5;
    }

    @media (max-width: 480px) {
      padding: 30px 25px 20px;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);

    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    @media (max-width: 768px) {
      color: var(--white);

      a {
        position: static;

        &:before {
          content: '';
          display: block;
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    color: var(--light-slate);
    font-size: var(--fz-lg);

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      color: var(--white);
      font-weight: normal;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        color: var(--lightest-slate);
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;

      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .cta {
      ${({ theme }) => theme.mixins.smallButton};
      margin: 10px;
    }
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: 100%;
      opacity: 0.25;
    }

    a {
      width: 100%;
      height: 100%;
      background-color: var(--green);
      border-radius: var(--border-radius);
      vertical-align: middle;

      &:hover,
      &:focus {
        background: transparent;
        outline: 0;

        &:before,
        .img {
          background: transparent;
          filter: none;
        }
      }

      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        transition: var(--transition);
        background-color: var(--navy);
        mix-blend-mode: screen;
      }
    }

    .img {
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1) brightness(90%);

      @media (max-width: 768px) {
        object-fit: cover;
        width: auto;
        height: 100%;
        filter: grayscale(100%) contrast(1) brightness(50%);
      }
    }
  }
`;

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  padding: 20px;

  .modal-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    background: var(--navy);
    border-radius: var(--border-radius);
    overflow: auto;
  }

  .modal-image {
    width: 100%;
    height: auto;
    display: block;
  }

  .modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: var(--green);
    color: var(--navy);
    border: none;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    z-index: 1001;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-info {
    padding: 20px;
  }

  .modal-title {
    color: var(--lightest-slate);
    margin: 0 0 15px;
    font-size: var(--fz-xl);

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        color: var(--green);
      }
    }
  }

  .modal-description {
    color: var(--light-slate);
    font-size: var(--fz-md);
    line-height: 1.5;
    margin-bottom: 15px;
  }

  .modal-tech {
    display: flex;
    flex-wrap: wrap;
    margin: 15px 0;
    padding: 0;
    list-style: none;

    li {
      margin: 0 10px 5px 0;
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
    }
  }

  .modal-links {
    display: flex;
    align-items: center;
    gap: 15px;

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 8px;
      color: var(--lightest-slate);

      &.external {
        svg {
          width: 18px;
          height: 18px;
        }
      }

      svg {
        width: 16px;
        height: 16px;
      }
    }

    .cta {
      ${({ theme }) => theme.mixins.smallButton};
      margin: 0;
    }
  }

  @media (min-width: 769px) {
    display: none !important;
  }
`;

const Featured = () => {
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project, image) => {
    setModalData({ project, image });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              cover {
                childImageSharp {
                  gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP])
                }
              }
              tech
              github
              external
              cta
            }
            html
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges.filter(({ node }) => node);
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <section id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        Some Things I’ve Built
      </h2>

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, tech, github, cover, cta } = frontmatter;
            const image = getImage(cover);

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <div className="project-content">
                  <div>
                    <p className="project-overline">Featured Project</p>

                    <button
                      className="project-title"
                      style={{
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        font: 'inherit',
                        color: 'inherit',
                        textAlign: 'inherit',
                        width: '100%',
                      }}
                      onClick={() => {
                        if (window.innerWidth <= 768) {
                          openModal({ frontmatter, html }, image);
                        } else {
                          window.open(external, '_blank');
                        }
                      }}>
                      <h3 style={{ margin: 0 }}>{title}</h3>
                    </button>

                    <button
                      className="project-description-button"
                      style={{
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        font: 'inherit',
                        color: 'inherit',
                        textAlign: 'inherit',
                        width: '100%',
                      }}
                      onClick={() => {
                        if (window.innerWidth <= 768) {
                          openModal({ frontmatter, html }, image);
                        }
                      }}>
                      <div
                        className="project-description"
                        dangerouslySetInnerHTML={{ __html: html }}
                      />
                    </button>

                    {tech.length && (
                      <ul className="project-tech-list">
                        {tech.map((tech, i) => (
                          <li key={i}>{tech}</li>
                        ))}
                      </ul>
                    )}

                    <div className="project-links">
                      {cta && (
                        <a href={cta} aria-label="Course Link" className="cta">
                          Learn More
                        </a>
                      )}
                      {github && (
                        <a href={github} aria-label="GitHub Link">
                          <Icon name="GitHub" />
                        </a>
                      )}
                      {external && !cta && (
                        <a href={external} aria-label="External Link" className="external">
                          <Icon name="External" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="project-image">
                  <a href={external ? external : github ? github : '#'}>
                    <GatsbyImage image={image} alt={title} className="img" />
                  </a>
                </div>
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>

      <StyledModal isOpen={isModalOpen} onClick={closeModal}>
        {modalData && (
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">
              ×
            </button>
            <GatsbyImage
              image={modalData.image}
              alt={modalData.project.frontmatter.title}
              className="modal-image"
            />
            <div className="modal-info">
              <h3 className="modal-title">
                <a
                  href={modalData.project.frontmatter.external}
                  target="_blank"
                  rel="noopener noreferrer">
                  {modalData.project.frontmatter.title}
                </a>
              </h3>
              <div
                className="modal-description"
                dangerouslySetInnerHTML={{ __html: modalData.project.html }}
              />
              {modalData.project.frontmatter.tech && (
                <ul className="modal-tech">
                  {modalData.project.frontmatter.tech.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
              )}
              <div className="modal-links">
                {modalData.project.frontmatter.cta && (
                  <a
                    href={modalData.project.frontmatter.cta}
                    aria-label="Learn More"
                    className="cta"
                    target="_blank"
                    rel="noopener noreferrer">
                    Learn More
                  </a>
                )}
                {modalData.project.frontmatter.github && (
                  <a
                    href={modalData.project.frontmatter.github}
                    aria-label="GitHub Link"
                    target="_blank"
                    rel="noopener noreferrer">
                    <Icon name="GitHub" />
                  </a>
                )}
                {modalData.project.frontmatter.external && !modalData.project.frontmatter.cta && (
                  <a
                    href={modalData.project.frontmatter.external}
                    aria-label="External Link"
                    className="external"
                    target="_blank"
                    rel="noopener noreferrer">
                    <Icon name="External" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </StyledModal>
    </section>
  );
};

export default Featured;
