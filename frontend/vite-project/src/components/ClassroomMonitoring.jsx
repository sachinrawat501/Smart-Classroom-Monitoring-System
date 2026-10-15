
import { useEffect, useRef, useState } from "react";
import {
  Video,
  Users,
  Radio,
  Camera,
  CameraOff,
} from "lucide-react";

const classrooms = [
  {
    id: 1,
    name: "Computer Lab 01",
    teacher: "Rahul Sharma",
    students: 45,
    status: "Live",
  },
  {
    id: 2,
    name: "Classroom 201",
    teacher: "Priya Verma",
    students: 38,
    status: "Live",
  },
  {
    id: 3,
    name: "Classroom 202",
    teacher: "Amit Singh",
    students: 42,
    status: "Live",
  },
  {
    id: 4,
    name: "Computer Lab 02",
    teacher: "Neha Gupta",
    students: 35,
    status: "Offline",
  },
];

function ClassroomCard({ classroom }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraOn(false);
    setLoading(false);
  };

  const startCamera = async () => {
    if (loading || cameraOn) return;

    try {
      setError("");
      setLoading(true);

      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Camera ke liye localhost ya HTTPS use karo.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      streamRef.current = stream;

      const video = videoRef.current;

      if (!video) {
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        throw new Error("Video element nahi mila. Page refresh karo.");
      }

      video.srcObject = stream;

      await video.play();

      setCameraOn(true);
      setLoading(false);

      stream.getVideoTracks()[0]?.addEventListener("ended", () => {
        setCameraOn(false);
        setError("Camera band ho gaya. Dobara Start Camera dabao.");
      });
    } catch (err) {
      console.error("Camera error:", err);

      setError(
        err.name === "NotAllowedError"
          ? "Camera permission blocked hai. Browser settings mein Allow karo."
          : err.name === "NotReadableError"
          ? "Camera kisi doosre app mein use ho raha hai. Use band karo."
          : err.message || "Camera start nahi ho paya."
      );

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      setCameraOn(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  return (
    <div className="classroom-card">
      <div
        className="classroom-preview"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#0f172a",
          minHeight: "190px",
        }}
      >
        {/* Video element hamesha mounted rahega */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: "100%",
            height: "190px",
            objectFit: "cover",
            display: cameraOn ? "block" : "none",
          }}
        />

        {!cameraOn && (
          <div
            style={{
              minHeight: "190px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#94a3b8",
              gap: "10px",
            }}
          >
            {classroom.status === "Live" ? (
              <Video size={42} />
            ) : (
              <Radio size={42} />
            )}

            <p style={{ margin: 0 }}>
              {loading
                ? "Starting camera..."
                : error
                ? "Camera unavailable"
                : "Camera preview unavailable"}
            </p>
          </div>
        )}

        <div
          className="live-badge"
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            zIndex: 1,
          }}
        >
          <span className="live-dot"></span>
          {cameraOn ? "Camera On" : "Preview"}
        </div>
      </div>

      <div className="classroom-info">
        <h3>{classroom.name}</h3>

        <p>Teacher: {classroom.teacher}</p>

        <div className="classroom-footer">
          <span>
            <Users
              size={14}
              style={{
                display: "inline",
                verticalAlign: "middle",
                marginRight: "5px",
              }}
            />
            {classroom.students} Students
          </span>

          <span>{cameraOn ? "Online" : classroom.status}</span>
        </div>

        <button
          type="button"
          onClick={cameraOn ? stopCamera : startCamera}
          disabled={loading}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            width: "100%",
            marginTop: "14px",
            padding: "10px 14px",
            border: "none",
            borderRadius: "8px",
            background: cameraOn ? "#dc2626" : "#2563eb",
            color: "#ffffff",
            fontWeight: 600,
            cursor: loading ? "wait" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {cameraOn ? <CameraOff size={17} /> : <Camera size={17} />}

          {loading
            ? "Starting..."
            : cameraOn
            ? "Stop Camera"
            : "Start Camera"}
        </button>

        {error && (
          <p
            role="alert"
            style={{
              color: "#dc2626",
              fontSize: "12px",
              marginTop: "8px",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

function ClassroomMonitoring() {
  return (
    <section className="card" id="classrooms">
      <div className="card-header">
        <div>
          <h2>Classroom Monitoring</h2>
          <p>Monitor your classrooms in one place.</p>
        </div>

        <button type="button" className="card-action">
          View All
        </button>
      </div>

      <div className="classroom-grid">
        {classrooms.map((classroom) => (
          <ClassroomCard key={classroom.id} classroom={classroom} />
        ))}
      </div>
    </section>
  );
}

export default ClassroomMonitoring;

