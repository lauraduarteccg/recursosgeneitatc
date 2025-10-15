import { IoMdCloseCircle } from "react-icons/io";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

export default function InfoModal({ open, onClose, companyKey, companyData, logo }) {
  if (!companyData) return null;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="right"
      PaperProps={{
        sx: {
          backgroundColor: "#ffffff",
          width: 500,
          padding: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: 4,
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
        },
      }}
    >
      {/* Botón de cierre */}
      <Button
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 20,
          right: 16,
          minWidth: "auto",
          p: 0,
          color: "#058abf",
          "&:hover": { color: "#046b92" },
        }}
      >
        <IoMdCloseCircle size={28} />
      </Button>

      {/* Contenido */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
          maxHeight: "100vh",
          mx: 12,
        }}
      >
        {logo && (
          <img
            src={logo}
            alt={companyKey}
            width={70}
            style={{ marginBottom: 16, borderRadius: 8 }}
          />
        )}

        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          {companyKey}
        </Typography>

        <Box sx={{ textAlign: "left", width: "100%" }}>
          {Object.entries(companyData).map(([key, value]) => (
            <Box key={key} sx={{ mb: 1 }}>
              <Typography variant="subtitle2" color="primary.main">
                {key.replace(/_/g, " ")}:
              </Typography>
              {typeof value === "string" && value.startsWith("http") ? (
                <Link
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{
                    color: "#058abf",
                    fontWeight: 500,
                    wordBreak: "break-all",
                  }}
                >
                  {value}
                </Link>
              ) : (
                <Typography variant="body2">
                  {typeof value === "object"
                    ? JSON.stringify(value, null, 2)
                    : value}
                </Typography>
              )}
            </Box>
          ))}
        </Box>

        <Button
          variant="contained"
          sx={{
            mt: 3,
            color: "#ffffff",
            backgroundColor: "#058abf",
            "&:hover": {
              backgroundColor: "#046b92",
              color: "#ffffff",
            },
          }}
          href={getFirstUrl(companyData)}
          target="_blank"
          disabled={!getFirstUrl(companyData)}
        >
          Ir al sitio
        </Button>
      </Box>
    </Drawer>
  );
}

// Busca el primer campo que parezca un link para el botón externo
function getFirstUrl(data) {
  for (const value of Object.values(data)) {
    if (typeof value === "string" && value.startsWith("http")) return value;
    if (typeof value === "object") {
      const nested = getFirstUrl(value);
      if (nested) return nested;
    }
  }
  return null;
}
