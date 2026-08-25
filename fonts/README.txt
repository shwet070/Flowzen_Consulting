GeistPixel-Circle.woff2 is not included here — I don't have that binary
font file. The site already loads BubbledotICG-FinePos from the
OnlineWebFonts CDN as the primary display face, so the retro dot-matrix
look works out of the box; the local file is only a fallback in the
--font-display stack. If you have the real Geist Pixel Circle woff2,
drop it in this folder and it'll be picked up automatically. Until then
the stack falls through to "monospace", which is barely noticeable
since the CDN font is what actually renders.
