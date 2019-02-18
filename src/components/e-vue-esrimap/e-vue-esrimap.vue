<template>
	<div class="e-ngx-map">
		<div class="eMap" ref="emapEle"></div>
		<!--<div class="eNavigation" v-If="enableNavigation">-->
		<!--<div class="zoom-map full-map" title="全图" @click="fullMap">-->
		<!--<i class="fa fa-globe" aria-hidden="true"></i>-->
		<!--</div>-->
		<!--<div class="zoom-map zoom-in-map" :class="{'zoom-disable': isMax}" title="放大一级" @click="zoomIn">-->
		<!--<i class="fa fa-plus" aria-hidden="true"></i>-->
		<!--</div>-->
		<!--<div class="zoom-map zoom-out-map" :class="{'zoom-disable': isMin}" title="缩小一级" @click="zoomOut">-->
		<!--<i class="fa fa-minus" aria-hidden="true"></i>-->
		<!--</div>-->
		<!--</div>-->
	</div>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
    import ENgxEsriMapLoaderService from './e-vue-esrimap-loader';

    @Component
    export default class Evueesrimap extends Vue {
        esriLoaderService: ENgxEsriMapLoaderService = new ENgxEsriMapLoaderService();
        private timeOutId: number; // 定时器id
        private locationLayer: any; // 定位图层
        private basemapIds: any[] = []; // 所有底图id
        private currBaseLayerIndex: number = 0; // 当前底图序号
        private fit: boolean = false;

        // esri
        Map: any;
        Color: any;
        Graphic: any;
        SpatialReference: any;
        urlUtils: any;
        esriConfig: any;

        // esri/tasks
        Geoprocessor: any;
        GeometryService: any;
        FeatureSet: any;
        FindTask: any;
        FindParameters: any;
        IdentifyTask: any;
        IdentifyParameters: any;
        QueryTask: any;
        Query: any;
        ProjectParameters: any;
        BufferParameters: any;

        // esri/layers
        ArcGISTiledMapServiceLayer: any;
        ArcGISDynamicMapServiceLayer: any;
        WebTiledLayer: any;
        GraphicsLayer: any;
        ImageParameters: any;
        TileInfo: any;

        // esri/geometry
        Extent: any;
        Point: any;
        ScreenPoint: any;
        Polyline: any;
        Polygon: any;
        WebMercatorUtils: any;

        // esri/symbols
        PictureMarkerSymbol: any;
        SimpleMarkerSymbol: any;
        SimpleLineSymbol: any;
        CartographicLineSymbol: any;
        PictureFillSymbol: any;
        SimpleFillSymbol: any;
        TextSymbol: any;
        Font: any;

        // toolbar
        Draw: any;

        // ENgxEsriMapComponent
        map: any; // 当前地图实例
        geometryService: any; // 当前几何服务实例
        isMax: boolean = false; // 比例是否最大
        isMin: boolean = false; // 比例是否最小

        @Prop() isProxy: boolean = false;

        @Prop() proxyUrl: string = 'proxy.jsp';

        // 底图路径
        @Prop({default: 'http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer'}) mapUrl;

        // 副底图路径，用作底图切换
        @Prop() submapUrl: any[] = ['http://server.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer'];

        // 几何服务路径
        @Prop() geoUrl: string = 'http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer';

        // arcgis javascript api路径
        @Prop() gisApiUrl: string = 'http://js.arcgis.com/3.23/';

        // esri.css路径
        @Prop() esriCSSUrl: string = 'http://js.arcgis.com/3.23/esri/css/esri.css';

        // 底图类型
        @Prop() mapType: string = 'tdt';

        // 地图初始范围
        @Prop() initExtent: any;

        // 是否启用导航
        @Prop() enableNavigation: boolean = true;

        constructor() {
            super();

        }

        mounted() {
            this.init();
            console.log(this.mapUrl);
        }


        private init(): void {
            this.loadEsriModules([
                'esri/map',
                'esri/urlUtils',
                'esri/config',
                'esri/graphic',
                'esri/Color',
                'esri/SpatialReference',
                'esri/tasks/Geoprocessor',
                'esri/tasks/ProjectParameters',
                'esri/tasks/GeometryService',
                'esri/tasks/FeatureSet',
                'esri/tasks/FindTask',
                'esri/tasks/FindParameters',
                'esri/tasks/IdentifyTask',
                'esri/tasks/IdentifyParameters',
                'esri/tasks/QueryTask',
                'esri/tasks/query',
                'esri/tasks/BufferParameters',
                'esri/layers/ArcGISTiledMapServiceLayer',
                'esri/layers/GraphicsLayer',
                'esri/layers/ImageParameters',
                'esri/layers/TileInfo',
                'esri/layers/WebTiledLayer',
                'esri/layers/ArcGISDynamicMapServiceLayer',
                'esri/geometry/Point',
                'esri/geometry/ScreenPoint',
                'esri/geometry/Extent',
                'esri/geometry/Polyline',
                'esri/geometry/Polygon',
                'esri/geometry/webMercatorUtils',
                'esri/symbols/PictureMarkerSymbol',
                'esri/symbols/SimpleMarkerSymbol',
                'esri/symbols/SimpleLineSymbol',
                'esri/symbols/CartographicLineSymbol',
                'esri/symbols/PictureFillSymbol',
                'esri/symbols/SimpleFillSymbol',
                'esri/symbols/TextSymbol',
                'esri/symbols/Font',
                'esri/toolbars/draw'
            ]).then(([
                         Map,
                         urlUtils,
                         esriConfig,
                         Graphic,
                         Color,
                         SpatialReference,
                         Geoprocessor,
                         ProjectParameters,
                         GeometryService,
                         FeatureSet,
                         FindTask,
                         FindParameters,
                         IdentifyTask,
                         IdentifyParameters,
                         QueryTask,
                         Query,
                         BufferParameters,
                         ArcGISTiledMapServiceLayer,
                         GraphicsLayer,
                         ImageParameters,
                         TileInfo,
                         WebTiledLayer,
                         ArcGISDynamicMapServiceLayer,
                         Point,
                         ScreenPoint,
                         Extent,
                         Polyline,
                         Polygon,
                         WebMercatorUtils,
                         PictureMarkerSymbol,
                         SimpleMarkerSymbol,
                         SimpleLineSymbol,
                         CartographicLineSymbol,
                         PictureFillSymbol,
                         SimpleFillSymbol,
                         TextSymbol,
                         Font,
                         Draw
                     ]) => {
                // 初始化模块
                this.Map = Map;
                this.urlUtils = urlUtils;
                this.esriConfig = esriConfig;
                this.Graphic = Graphic;
                this.Color = Color;
                this.SpatialReference = SpatialReference;
                this.Geoprocessor = Geoprocessor;
                this.ProjectParameters = ProjectParameters;
                this.GeometryService = GeometryService;
                this.FeatureSet = FeatureSet;
                this.FindTask = FindTask;
                this.FindParameters = FindParameters;
                this.IdentifyTask = IdentifyTask;
                this.IdentifyParameters = IdentifyParameters;
                this.QueryTask = QueryTask;
                this.Query = Query;
                this.BufferParameters = BufferParameters;
                this.ArcGISTiledMapServiceLayer = ArcGISTiledMapServiceLayer;
                this.GraphicsLayer = GraphicsLayer;
                this.ImageParameters = ImageParameters;
                this.TileInfo = TileInfo;
                this.WebTiledLayer = WebTiledLayer;
                this.ArcGISDynamicMapServiceLayer = ArcGISDynamicMapServiceLayer;
                this.Point = Point;
                this.ScreenPoint = ScreenPoint;
                this.Extent = Extent;
                this.Polyline = Polyline;
                this.Polygon = Polygon;
                this.WebMercatorUtils = WebMercatorUtils;
                this.PictureMarkerSymbol = PictureMarkerSymbol;
                this.SimpleMarkerSymbol = SimpleMarkerSymbol;
                this.SimpleLineSymbol = SimpleLineSymbol;
                this.CartographicLineSymbol = CartographicLineSymbol;
                this.PictureFillSymbol = PictureFillSymbol;
                this.SimpleFillSymbol = SimpleFillSymbol;
                this.TextSymbol = TextSymbol;
                this.Font = Font;
                this.Draw = Draw;
                this.initMap();
            });

        }

        /**
         * 初始化地图
         */
        private initMap(): void {

            // 初始化几何服务
            if (this.geoUrl) {
                this.geometryService = new this.GeometryService(this.geoUrl);
            } else {
                throw new Error('geoUrl未配置，将导致坐标转换等功能无法使用！');
            }

            // 设置代理
            if (this.isProxy) {
                this.esriConfig.defaults.io.proxyUrl = this.proxyUrl;
                this.esriConfig.defaults.io.alwaysUseProxy = true;
                this.urlUtils.addProxyRule({
                    urlPrefix: 'route.arcgis.com',
                    proxyUrl: this.proxyUrl
                });
            }

            // 初始化地图
            this.map = new this.Map(this.$refs.emapEle, {});

            // 加载底图
            if (this.mapType === 'tdt') {
                // 初始底图
                this.getTdtLayer(Array.isArray(this.mapUrl) ? this.mapUrl : [this.mapUrl]).then((layers: any[]) => {
                    const baseamapLayerIds: string[] = [];
                    layers.forEach((layer: any, index: number) => {
                        baseamapLayerIds.push(layer.id);
                        this.map.addLayer(layer);
                    });
                    this.basemapIds.push(baseamapLayerIds);
                });
            } else {
                throw new Error('请指定输入属性 mapType 的值！');
            }
        }

        /**
         * 获取天地图图层
         * @param layers 图层的代码
         * @returns {Promise<T>}
         */
        private getTdtLayer(layers: string[]): Promise<any> {
            return new Promise((resolve) => {
                const tileInfo: any = new this.TileInfo({
                        rows: 256,
                        cols: 256,
                        compressionQuality: 0,
                        origin: {
                            x: -180,
                            y: 90
                        },
                        spatialReference: {
                            wkid: 4326
                        },
                        lods: [
                            {'level': 2, 'resolution': 0.3515625, 'scale': 147748796.52937502},
                            {'level': 3, 'resolution': 0.17578125, 'scale': 73874398.264687508},
                            {'level': 4, 'resolution': 0.087890625, 'scale': 36937199.132343754},
                            {'level': 5, 'resolution': 0.0439453125, 'scale': 18468599.566171877},
                            {'level': 6, 'resolution': 0.02197265625, 'scale': 9234299.7830859385},
                            {'level': 7, 'resolution': 0.010986328125, 'scale': 4617149.8915429693},
                            {'level': 8, 'resolution': 0.0054931640625, 'scale': 2308574.9457714846},
                            {'level': 9, 'resolution': 0.00274658203125, 'scale': 1154287.4728857423},
                            {'level': 10, 'resolution': 0.001373291015625, 'scale': 577143.73644287116},
                            {'level': 11, 'resolution': 0.0006866455078125, 'scale': 288571.86822143558},
                            {'level': 12, 'resolution': 0.00034332275390625, 'scale': 144285.93411071779},
                            {'level': 13, 'resolution': 0.000171661376953125, 'scale': 72142.967055358895},
                            {'level': 14, 'resolution': 8.58306884765625e-005, 'scale': 36071.483527679447},
                            {'level': 15, 'resolution': 4.291534423828125e-005, 'scale': 18035.741763839724},
                            {'level': 16, 'resolution': 2.1457672119140625e-005, 'scale': 9017.8708819198619},
                            {'level': 17, 'resolution': 1.0728836059570313e-005, 'scale': 4508.9354409599309},
                            {'level': 18, 'resolution': 5.3644180297851563e-006, 'scale': 2254.4677204799655}
                        ]
                    }),
                    subDomains: string[] = ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
                    tdtLayers: any[] = [];
                layers.forEach((type) => {
                    const templateUrl: string = 'http://${subDomain}.tianditu.com/DataServer?T=' + type + '_c&X=${col}&Y=${row}&L=${level}&tk=8e1a3b0631a1057635c6cc28bece1e31';
                    const tdtLayer: any = new this.WebTiledLayer(templateUrl, {
                        id: 'tdt_' + type,
                        subDomains: subDomains,
                        tileInfo: tileInfo
                    });
                    tdtLayers.push(tdtLayer);
                });
                resolve(tdtLayers);
            });
        }

        /**
         * 加载arcgis api for javascript的模块
         * @param modules
         * @returns {Promise<any>}
         */
        loadEsriModules(modules: string[]): Promise<any> {
            console.log(modules);
            return this.esriLoaderService.loadModules(modules);
        }

    }
</script>

<style scoped lang="scss">
	.eMap {
		height: 500px;
	}
</style>