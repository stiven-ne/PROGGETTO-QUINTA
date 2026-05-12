// Usiamo "module.exports" se gli altri file usano "require", 
// o "export" se usi i moduli ES (import). 
// Visto il tuo authMiddleware, usiamo exports.nomedivisa:

exports.verifyTenant = (req, res, next) => {
    // Recuperiamo il tenant_id che abbiamo inserito nel token durante il login
    const tenantId = req.user?.tenant_id; 

    if (!tenantId) {
        return res.status(403).json({ error: "Accesso negato. Nessun tenant (azienda) identificato nel profilo." });
    }

    // Lo salviamo in req.tenantId così è facile da usare nei controller
    req.tenantId = tenantId;
    next();
};