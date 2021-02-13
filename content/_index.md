---
type: "static"
---

{{< section >}} 

<div class="column">
    <div style = 'flex:35%'> Azimuth is a web application that enables rapid mapping of your own single-cell RNA-seq datasets ("queries") onto a larger dataset that we provide ("reference"). Information from the reference, which may include detailed cell type annotations and single-cell protein expression, can then be transferred onto your query. Azimuth also implements functionality for quality control, DE testing & biomarker identification, and visualization of query metadata and feature expression. Results from Azimuth can be downloaded at the click of a button and ported into your favorite software package for further analysis.</div>
    <img src="/img/azimuth_screenshot.png" style='flex:65%'></img>
</div>

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
