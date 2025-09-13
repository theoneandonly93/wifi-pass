use anchor_lang::prelude::*;

// Program ID: Replace with your deployed program ID
// declare_id!("YourProgramIdHere");

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkgMQoezjZ8h1");

#[program]
pub mod wifi_pass {
    use super::*;

    pub fn initialize_hotspot(ctx: Context<InitializeHotspot>, metadata_uri: String) -> Result<()> {
        let hotspot = &mut ctx.accounts.hotspot;
        hotspot.owner = *ctx.accounts.authority.key;
        hotspot.metadata_uri = metadata_uri;
        Ok(())
    }

    pub fn issue_pass(ctx: Context<IssuePass>, pass_type: PassType, duration: u64, price: u64) -> Result<()> {
        let pass = &mut ctx.accounts.pass;
        pass.owner = *ctx.accounts.user.key;
        pass.pass_type = pass_type;
        pass.expiry = Clock::get()?.unix_timestamp as u64 + duration;

        // Payment logic: 90% to creator, 10% to vault
        let creator_share = price * 90 / 100;
        let vault_share = price - creator_share;

        // Transfer 90% to creator
        anchor_lang::system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                anchor_lang::system_program::Transfer {
                    from: ctx.accounts.user.to_account_info(),
                    to: ctx.accounts.creator.to_account_info(),
                },
            ),
            creator_share,
        )?;

        // Transfer 10% to vault
        anchor_lang::system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                anchor_lang::system_program::Transfer {
                    from: ctx.accounts.user.to_account_info(),
                    to: ctx.accounts.vault.to_account_info(),
                },
            ),
            vault_share,
        )?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeHotspot<'info> {
    #[account(init, payer = authority, space = 8 + 32 + 256)]
    pub hotspot: Account<'info, Hotspot>;
    #[account(mut)]
    pub authority: Signer<'info>;
    pub system_program: Program<'info, System>;
}

#[derive(Accounts)]
pub struct IssuePass<'info> {
    #[account(init, payer = user, space = 8 + 32 + 8 + 8)]
    pub pass: Account<'info, Pass>;
    #[account(mut)]
    pub user: Signer<'info>;
    /// CHECK: This is the contract creator's address
    #[account(mut)]
    pub creator: AccountInfo<'info>;
    /// CHECK: This is the vault account
    #[account(mut)]
    pub vault: AccountInfo<'info>;
    pub system_program: Program<'info, System>;
}

#[account]
pub struct Vault {
    pub balance: u64, // Optionally track balance for analytics
}

#[account]
pub struct Hotspot {
    pub owner: Pubkey,
    pub metadata_uri: String, // Off-chain metadata (location, SSID, etc.)
}

#[account]
pub struct Pass {
    pub owner: Pubkey,
    pub pass_type: PassType,
    pub expiry: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum PassType {
    Daily,
    Weekly,
    Monthly,
}
