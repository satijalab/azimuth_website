import { ClickEvent, PointerMoveEvent, Tooltip, ModeProps, GuideFeatureCollection, EditHandleFeature } from '../types';
import { FeatureCollection, Position } from '../geojson-types';
import { GeoJsonEditMode } from './geojson-edit-mode';
export declare class MeasureDistanceMode extends GeoJsonEditMode {
    startingPoint: Readonly<EditHandleFeature> | null | undefined;
    endingPoint: Readonly<EditHandleFeature> | null | undefined;
    endingPointLocked: boolean;
    _setEndingPoint(mapCoords: Position): void;
    _getTooltips: (args: any) => any;
    handleClick(event: ClickEvent, props: ModeProps<FeatureCollection>): void;
    handlePointerMove(event: PointerMoveEvent, props: ModeProps<FeatureCollection>): void;
    getGuides(props: ModeProps<FeatureCollection>): GuideFeatureCollection;
    getTooltips(props: ModeProps<FeatureCollection>): Tooltip[];
}
//# sourceMappingURL=measure-distance-mode.d.ts.map