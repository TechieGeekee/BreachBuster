// SHA-1 hashing utility for password breach checking
// Uses the Web Crypto API for secure hashing

export async function sha1Hash(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex.toUpperCase();
}

export async function checkPasswordBreach(password: string): Promise<{
  isBreached: boolean;
  breachCount: number;
  error?: string;
}> {
  try {
    if (!password.trim()) {
      throw new Error("Password cannot be empty");
    }

    // Generate SHA-1 hash of the password
    const fullHash = await sha1Hash(password);
    const hashPrefix = fullHash.substring(0, 5);
    const hashSuffix = fullHash.substring(5).toLowerCase();

    // Call our backend API
    const response = await fetch('/api/check-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hashPrefix })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Password check failed");
    }

    // Check if our password hash suffix is in the returned list
    const matchingHash = data.hashSuffixes.find((item: { suffix: string; count: number }) => 
      item.suffix === hashSuffix
    );

    if (matchingHash) {
      return {
        isBreached: true,
        breachCount: matchingHash.count
      };
    } else {
      return {
        isBreached: false,
        breachCount: 0
      };
    }

  } catch (error: any) {
    console.error("Password breach check error:", error);
    return {
      isBreached: false,
      breachCount: 0,
      error: error.message || "Failed to check password"
    };
  }
}