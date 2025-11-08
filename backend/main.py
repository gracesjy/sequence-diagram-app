from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
# CORS 설정 (개발 중 React가 다른 포트에서 실행될 경우 필요)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React 개발 서버 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# index.html을 루트 경로로 서빙
@app.get("/")
def read_index():
    return FileResponse("../frontend/build/index.html")

@app.get("/manifest.json")
def read_manifest():
    return FileResponse("../frontend/build/manifest.json")

@app.get("/api/phases")
def get_phases():
    return {
        "EQMode": [
            {
              "name": "ONLINE_LOCAL_REP",
              "messages": [
                { "from": "EQP", "to": "EAP", "transaction": "ERS_PROC" },
                { "from": "EAP", "to": "EIS", "transaction": "EAPEIS_EQMODE_OL" }
              ]
            },
            {
              "name": "ONLINE_REMOTE_REQ",
              "messages": [
                { "from": "EIS", "to": "EAP", "transaction": "EISEAP_EQMODE_OR_REQ" },
                { "from": "EAP", "to": "EQP", "transaction": "RONL" }
              ]
            },
            {
              "name": "ONLINE_REMOTE_REP",
              "messages": [
                { "from": "EQP", "to": "EAP", "transaction": "ERS_PROC" },
                { "from": "EAP", "to": "EIS", "transaction": "EAPEIS_EQMODE_OR" }
              ]
            },
            {
              "name": "OFFLINE_REQ",
              "messages": [
                { "from": "EIS", "to": "EAP", "transaction": "EISEAP_EQMODE_OF_REQ" },
                { "from": "EAP", "to": "EQP", "transaction": "ROFL" }
              ]
            },
            {
              "name": "OFFLINE_REP",
              "messages": [
                { "from": "EQP", "to": "EAP", "transaction": "ERS_PROC" },
                { "from": "EAP", "to": "EIS", "transaction": "EAPEIS_EQMODE_OF" }
              ]
            }
          ],
        "LotTracking": [
        {
          "name": "JOB_INFO_RESV",
          "messages": [
            {
              "from": "EIS",
              "to": "EAP",
              "transaction": "EISEAP_JOB_INFO_RESV",
              "detail": "EAP이 EQP로 EISEAP_JOB_INFO_RESV 송신"
            },
            {
              "from": "EAP",
              "to": "EQP",
              "transaction": "PPIDCHECK",
              "detail": "EAP이 EQP로 PPIDCHECK 전송"
            }
          ]
        },
        {
          "name": "PPID_SUCC",
          "messages": [
            {
              "from": "EQP",
              "to": "EAP",
              "transaction": "S7F20",
              "detail": "EQP이 EAP로 RED_1 수신"
            },
            {
              "from": "EAP",
              "to": "EAP",
              "transaction": "EAP_PPIDCHECK",
              "detail": "EAP이 EQP로 EAP_PPIDCHECK 호출"
            }
          ]
        },
        {
          "name": "CARRIER_ARRIVED",
          "messages": [
            {
              "from": "EQP",
              "to": "EAP",
              "transaction": "ERS_MODE",
              "detail": "EQP이 EAP로 ERS_MODE 수신"
            },
            {
              "from": "EAP",
              "to": "EQP",
              "transaction": "EAPEIS_PORT_ARRIVED",
              "detail": "EAP이 EQP로 EAPEIS_PORT_ARRIVED 호출"
            }
          ]
        },
        {
          "name": "CARRIER_READ",
          "messages": [
            {
              "from": "EQP",
              "to": "EAP",
              "transaction": "ERS_MAP",
              "detail": "EQP이 EAP로 ERS_MAP 수신"
            },
            {
              "from": "EAP",
              "to": "EQP",
              "transaction": "EAPEIS_VERIFY_SLOT_REQ",
              "detail": "EAP이 EQP로 EAPEIS_VERIFY_SLOT_REQ 호출"
            }
          ]
        },
        {
          "name": "CARRIER_READ_SUCC",
          "messages": [
            {
              "from": "EAP",
              "to": "EQP",
              "transaction": "EISEAP_VERIFY_SLOT_SUCC",
              "detail": "EAP이 EQP로 EISEAP_VERIFY_SLOT_SUCC 송신"
            },
            {
              "from": "EAP",
              "to": "EQP",
              "transaction": "HCS_PRJOB_CREATE",
              "detail": "EAP이 EQP로 HCS_PRJOB_CREATE 전송"
            }
          ]
        },
        {
          "name": "START_CMD_REQ",
          "messages": [
            {
              "from": "EQP",
              "to": "EAP",
              "transaction": "ERS_MODE",
              "detail": "EQP이 EAP로 ERS_MODE 수신"
            },
            {
              "from": "EAP",
              "to": "EQP",
              "transaction": "EAPEIS_START_CMD_REQ",
              "detail": "EAP이 EQP로 EAPEIS_START_CMD_REQ 호출"
            }
          ]
        },
        {
          "name": "START_CMD",
          "messages": [
            {
              "from": "EAP",
              "to": "EQP",
              "transaction": "EISEAP_START_CMD",
              "detail": "EAP이 EQP로 EISEAP_START_CMD 송신"
            },
            {
              "from": "EAP",
              "to": "EQP",
              "transaction": "HCS_START",
              "detail": "EAP이 EQP로 HCS_START 전송"
            }
          ]
        },
        {
          "name": "MVIN",
          "messages": [
            {
              "from": "EQP",
              "to": "EAP",
              "transaction": "ERS_MODE",
              "detail": "EQP이 EAP로 ERS_MODE 수신"
            },
            {
              "from": "EAP",
              "to": "EQP",
              "transaction": "EAPEIS_MVIN_REQ",
              "detail": "EAP이 EQP로 EAPEIS_MVIN_REQ 호출"
            },
            {
              "from": "EAP",
              "to": "FDC",
              "transaction": "EAPFDC_TOOLEVENT",
              "detail": "EAP이 FDC로 EAPFDC_TOOLEVENT 호출"
            }
          ]
        },
        {
          "name": "STEPPERSTART",
          "messages": [
            {
              "from": "EQP",
              "to": "EAP",
              "transaction": "ERS_INLINE",
              "detail": "EQP이 EAP로 ERS_INLINE 수신"
            },
            {
              "from": "EAP",
              "to": "EQP",
              "transaction": "EAPEIS_STEPPER_START_REQ",
              "detail": "EAP이 EQP로 EAPEIS_STEPPER_START_REQ 호출"
            }
          ]
        },
        {
          "name": "MVOU",
          "messages": [
            {
              "from": "EQP",
              "to": "EAP",
              "transaction": "ERS_MODE",
              "detail": "EQP이 EAP로 ERS_MODE 수신"
            },
            {
              "from": "EAP",
              "to": "EQP",
              "transaction": "EAPEIS_MVOU_REQ",
              "detail": "EAP이 EQP로 EAPEIS_MVOU_REQ 호출"
            },
            {
              "from": "EAP",
              "to": "FDC",
              "transaction": "EAPFDC_TOOLEVENT",
              "detail": "EAP이 FDC로 EAPFDC_TOOLEVENT 호출"
            },
            {
              "from": "EAP",
              "to": "EQP",
              "transaction": "EAP_CHANNELREMOVE",
              "detail": "EAP이 EQP로 EAP_CHANNELREMOVE 호출"
            }
          ]
        },
        {
          "name": "PORT_UNLOAD",
          "messages": [
            {
              "from": "EQP",
              "to": "EAP",
              "transaction": "ERS_MODE",
              "detail": "EQP이 EAP로 ERS_MODE 수신"
            },
            {
              "from": "EAP",
              "to": "EQP",
              "transaction": "EAPEIS_PORT_UNLOAD",
              "detail": "EAP이 EQP로 EAPEIS_PORT_UNLOAD 호출"
            }
          ]
        }
        ],

        "FDC": [
          {
            "name": "SETSENSOR",
            "messages": [
              { "from": "EIS", "to": "EAP", "transaction": "FDCEAP_SETSENSOR" }
            ]
          },
          {
            "name": "STOPSENSOR",
            "messages": [
              { "from": "EIS", "to": "EAP", "transaction": "FDCEAP_STOPSENSOR" }
            ]
          },
          {
            "name": "TOOLDATA",
            "messages": [
              { "from": "EQP", "to": "EAP", "transaction": "TRACE_DATA" },
              { "from": "EAP", "to": "FDC", "transaction": "EAPFDC_TOOLDATA" }
            ]
          }
        ],
    }

# React build 폴더를 정적 파일로 서빙
#app.mount("/static", StaticFiles(directory="../frontend/build/static"), name="static")
#app.mount("/images", StaticFiles(directory="../frontend/build/images"), name="images")


#app.mount("/", StaticFiles(directory="../frontend/build", html=True), name="frontend")