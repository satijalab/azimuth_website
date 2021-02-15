---
type: "static"
---

{{< section >}} 

<p style='font-size:18px'> 
Azimuth is a web application that uses an annotated reference dataset to <b>automate the processing, analysis, and interpretation of a new single-cell RNA-seq experiment</b>. Azimuth leverages a <b>'reference-based mapping'</b> pipeline that inputs a counts matrix of gene expression in single cells, and performs normalization, visualization, cell annotation, and differential expression (biomarker discovery). All results can be explored within the app, and easily downloaded for additional downstream analysis.
</p>

The development of Azimuth is led by the New York Genome Center Mapping Component as part of the [NIH Human Biomolecular Atlas Project (HuBMAP)](https://commonfund.nih.gov/hubmap). Molecular reference maps are currently available for four organs, listed below, with more coming soon. 

{{< /section >}}

{{< azimuth_references >}}

{{< section >}}

# General Workflow
1. Upload a file containing raw data and optional cell-level metadata.
2. If desired, filter cells by `nCount_RNA`, `nFeature_RNA`, and `percent.mt` in the Preprocessing tab.
3. Click "Map cells to reference" to preprocess with SCTransform and run the mapping algorithm         
4. View the results.                                                                        
    * "Cell Plots" tab: DimPlot of the reference; DimPlot of the query colored by predicted cell type OR your metadata; table of metadata categories
    * "Feature Plots" tab: FeaturePlot and ViolinPlot of RNA, imputed protein, continuous metadata/prediction scores/mapping score; tables of RNA and imputed protein biomarkers for each predicted cell type cluster (click on a table row and it switches the plot to that feature!)
5. If desired, download files for further analysis from the "Download Results" tab.

{{< /section >}}

{{< azimuth_faq >}}
