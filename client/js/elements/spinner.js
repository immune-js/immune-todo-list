import
  { h
  } from "immune/ui"

export default () =>
  h("svg", { width: "120", height: "30", viewBox: "0 0 120 30", xmlns: "http://www.w3.org/2000/svg", fill: "#e00000" },
    [ h("circle", { cx: "15", cy: "15", r: "15" },
        [ h("animate", 
            { attributeName: "r", from: "15", to: "15"
            , begin: "0s", dur: "0.8s"
            , values: "15;9;15", calcMode: "linear"
            , repeatCount: "indefinite"
            }
          )
        , h("animate", 
            { attributeName: "fill-opacity", from: "1", to: "1"
            , begin: "0s", dur: "0.8s"
            , values: "1;.5;1", calcMode: "linear"
            , repeatCount: "indefinite"
            }
          )
        ]
      )
    , h("circle", { cx: "60", cy: "15", r: "9", fillOpacity: "0.3" },
        [ h("animate", 
            { attributeName: "r", from: "9", to: "9"
            , begin: "0s", dur: "0.8s"
            , values: "9;15;9", calcMode: "linear"
            , repeatCount: "indefinite"
            }
          )
        , h("animate", 
            { attributeName: "fill-opacity", from: "0.5", to: "0.5"
            , begin: "0s", dur: "0.8s"
            , values: ".5;1;.5", calcMode: "linear"
            , repeatCount: "indefinite"
            }
          )
        ]
      )
    , h("circle", { cx: "105", cy: "15", r: "15" },
        [ h("animate", 
            { attributeName: "r", from: "15", to: "15"
            , begin: "0s", dur: "0.8s"
            , values: "15;9;15", calcMode: "linear"
            , repeatCount: "indefinite"
            }
          )
        , h("animate", 
            { attributeName: "fill-opacity", from: "1", to: "1"
            , begin: "0s", dur: "0.8s"
            , values: "1;.5;1", calcMode: "linear"
            , repeatCount: "indefinite"
            }
          )
        ]
      )
    ]
  )