---
type: "static"
---

{{< section >}}

<p style='font-size:18px'>
Azimuth is a toolkit for <b>reference-mapping, annotation, and interpretation of single-cell datasets</b>. We are introducing <b>Pan-Human Azimuth</b>, a neural-network classifier for human single-cell and single-nucleus RNA-seq experiments that maps cells into a consistent hierarchical cell ontology across tissues and technologies.
</p>

Pan-Human Azimuth replaces the previous model of choosing separate Azimuth web applications for individual tissue or organ references. Instead, users can map data with a single pan-human, organ-spanning reference trained across 23 human tissues and 380 high-resolution cell types. The classifier returns hierarchical annotations, confidence scores, and Azimuth embeddings that can be used for downstream analysis and quality control.

{{< /section >}}

{{< section >}}

# Pan-Human Azimuth

Pan-Human Azimuth is currently available through a free command-line API/workflow and can be accessed from both R and Python:

* **R users** can run Pan-Human Azimuth directly on Seurat objects with the `CloudAzimuth` interface.
* **Python users** can run the `panhumanpy` package locally, either from the command line with `annotate` or interactively from Python on AnnData objects.
* For installation instructions, examples, and support links, see the [Pan-Human Azimuth quick start guide](https://satijalab.org/pan_human_azimuth/).

{{< /section >}}

{{< section >}}

# Existing tissue-specific references

As part of this transition, we are no longer creating or updating tissue-specific Azimuth references, and we are no longer supporting the web applications for individual tissue-specific references.

Users can still map new datasets to the existing Azimuth references in R. The Seurat vignette on [mapping and annotating query datasets](https://satijalab.org/seurat/articles/integration_mapping.html) describes this workflow.

{{< /section >}}
